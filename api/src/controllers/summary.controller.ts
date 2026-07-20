import { Request, Response, NextFunction } from "express";

import { generateSummary } from "../services/openai.services";


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


        const response = await generateSummary(

            text,

            {

                length,

                tone,

                format

            }

        );


        let summary = "";


        for await (const part of response) {

            summary += part.message.content;

        }


        return res.status(200).json({

            summary: stripPreamble(summary.trim())

        });


    } catch (error) {


        console.error(

            "Summary error:",

            error

        );


        next(error);

    }

}