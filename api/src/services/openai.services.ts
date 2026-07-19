import ollama from "ollama";

interface Options {


length: string;

tone: string;

format: string;


}

export async function generateSummary(


text: string,

options: Options


) {


const lengthInstructions = {


    short: `

        Write a very concise summary.

        Use approximately 2-3 sentences.

        Include only the most important information.

    `,


    medium: `

        Write a balanced summary.

        Use approximately 4-5 sentences.

        Include the main ideas and important supporting details.

    `,


    long: `

        Write a detailed summary.

        Use approximately 6-8 sentences.

        Include all major ideas and important context.

    `


};


const toneInstructions = {


    casual: `

        Use a friendly, natural and conversational tone.

        Keep the language easy to understand.

    `,


    professional: `

        Use a clear, polished and professional tone.

        Keep the writing precise and objective.

    `


};


const formatInstructions = {


    paragraph: `

        Return the summary as clear paragraphs.

        Do not use bullet points.

    `,


    bullets: `

        Return the summary as bullet points.

        Each bullet should contain one important idea.

        Start every bullet with "- ".

        Do not return the answer as a large paragraph.

    `


};


const selectedLength =

    lengthInstructions[

        options.length as keyof typeof lengthInstructions

    ] || lengthInstructions.medium;


const selectedTone =

    toneInstructions[

        options.tone as keyof typeof toneInstructions

    ] || toneInstructions.professional;


const selectedFormat =

    formatInstructions[

        options.format as keyof typeof formatInstructions

    ] || formatInstructions.paragraph;


const prompt = `


You are an expert AI text summarisation assistant.

Summarise the text below accurately.

IMPORTANT RULES:

* Keep only the most important information.

* Do not repeat the original text unnecessarily.

* Do not add information that is not present.

* Do not invent facts.

* Preserve the original meaning.

* Be direct and clear.

SUMMARY LENGTH:

${selectedLength}

TONE:

${selectedTone}

OUTPUT FORMAT:

${selectedFormat}

TEXT TO SUMMARISE:

${text}

Return only the final summary.

`;


const response = await ollama.chat({


    model: "qwen2.5:1.5b",


    messages: [


        {

            role: "user",

            content: prompt

        }


    ],


    stream: true,


    options: {


        temperature: 0.2,


        num_predict:


            options.length === "short"

                ? 100

                : options.length === "medium"

                    ? 180

                    : 300


    }


});


return response;


}
