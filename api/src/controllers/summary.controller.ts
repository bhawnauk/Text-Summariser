import { Request, Response, NextFunction } from "express";

import { generateSummary } from "../services/openai.services";
import { processText } from "../services/processor.service";


const ACKNOWLEDGEMENT_PATTERN =
    /^(sure|okay|ok|certainly|absolutely|alright|got it|no problem)\s*[!.,]*\s*/i;


const PREAMBLE_PATTERN =
    /^(here('?s| is)\s+)?(a|the|your)?\s*(brief|short|concise|quick|detailed)?\s*summary\s*(of\s+(the\s+)?(text|article|content|passage))?\s*[:\-]\s*/i;


const STANDALONE_LABEL_PATTERN = /^summary\s*\n+/i;


const DIVIDER_PATTERN = /^[-*_]{3,}\s*/;


function stripPreamble(text: string): string {

    let cleaned = text.trimStart();

    let previous: string;


    do {

        previous = cleaned;

        cleaned = cleaned.replace(ACKNOWLEDGEMENT_PATTERN, "");

        cleaned = cleaned.replace(PREAMBLE_PATTERN, "");

        cleaned = cleaned.replace(STANDALONE_LABEL_PATTERN, "");

        cleaned = cleaned.replace(DIVIDER_PATTERN, "");

        cleaned = cleaned.trimStart();

    } while (cleaned !== previous);


    cleaned = cleaned.replace(/\s*[-*_]{3,}\s*$/, "");


    return cleaned.trim();

}


async function collectSummary(

    response: Awaited<ReturnType<typeof generateSummary>>

): Promise<string> {

    let text = "";

    for await (const part of response) {

        text += part.message.content;

    }

    return stripPreamble(text.trim());

}


export async function summarise(

    req: Request,

    res: Response,

    next: NextFunction

) {


    try {


        const {

            text,

            length = "medium",

            tone = "professional",

            format = "paragraph"

        } = req.body;


        if (!text || !text.trim()) {

            return res.status(400).json({

                error: "Text is required."

            });

        }


        let chunks: string[];


        try {

            ({ chunks } = await processText(text));

        } catch (processorError) {

            console.error("Processor error:", processorError);

            return res.status(502).json({

                error: "The text processor service is unavailable. Make sure it is running (see README)."

            });

        }


        let summary: string;


        if (chunks.length <= 1) {


            const response = await generateSummary(

                chunks[0] ?? text,

                {

                    length,

                    tone,

                    format

                }

            );


            summary = await collectSummary(response);


        } else {


            const partialSummaries: string[] = [];


            for (const chunk of chunks) {

                const partialResponse = await generateSummary(

                    chunk,

                    {

                        length: "medium",

                        tone,

                        format: "paragraph"

                    }

                );


                partialSummaries.push(

                    await collectSummary(partialResponse)

                );

            }


            const finalResponse = await generateSummary(

                partialSummaries.join("\n\n"),

                {

                    length,

                    tone,

                    format

                }

            );


            summary = await collectSummary(finalResponse);

        }


        return res.status(200).json({

            summary

        });


    } catch (error) {


        console.error(

            "Summary error:",

            error

        );


        next(error);

    }

}