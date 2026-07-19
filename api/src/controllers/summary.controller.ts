import { Request, Response, NextFunction } from "express";

import { generateSummary } from "../services/openai.services";


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

            summary: summary.trim()

        });


    } catch (error) {


        console.error(

            "Summary error:",

            error

        );


        next(error);

    }

}