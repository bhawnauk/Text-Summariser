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

        Write exactly 2 sentences. Not 3, not 4 — exactly 2.

        Include only the single most important idea.

    `,


    medium: `

        Write exactly 5 sentences.

        Include the main ideas and the most important supporting details.

    `,


    long: `

        Write exactly 8 sentences.

        Include all major ideas, supporting details, specific numbers, and examples from the text.

    `


};


const lengthLabel = {

    short: "exactly 2 sentences",

    medium: "exactly 5 sentences",

    long: "exactly 8 sentences"

};


const toneInstructions = {


    casual: `

        Write like you are explaining this to a friend in conversation.

        Use contractions such as it's, don't, that's, we're.

        Use simple everyday words instead of formal vocabulary.

        Do not use formal transition words like "furthermore", "moreover", or "additionally".

    `,


    professional: `

        Write in a formal, objective register suitable for a business report.

        Do not use contractions.

        Use precise vocabulary and formal transition words such as "however" and "additionally" where relevant.

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


const selectedLengthLabel =

    lengthLabel[

        options.length as keyof typeof lengthLabel

    ] || lengthLabel.medium;


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
* Do NOT include any preamble, label, or heading such as "Summary:", "Here is a summary:", or similar.
* Output ONLY the summary content itself, nothing else.

SUMMARY LENGTH:

${selectedLength}

TONE:

${selectedTone}

OUTPUT FORMAT:

${selectedFormat}

TEXT TO SUMMARISE:

${text}

REMINDER: Write ${selectedLengthLabel} in a ${options.tone || "professional"} tone. Count your sentences before answering.

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

                ? 80

                : options.length === "medium"

                    ? 220

                    : 380


    }


});


return response;


}
