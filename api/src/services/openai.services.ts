import client from "../config/openai";


interface Options{

    length:string;

    tone:string;

}



export async function generateSummary(

    text:string,

    options:Options

){


const prompt = `

You are an expert editor.


Summarise this text.


Requirements:

- Preserve important facts
- Keep names and dates
- Do not hallucinate
- Make it easy to understand


Summary length:

${options.length}


Tone:

${options.tone}



TEXT:

${text}

`;



const response =
await client.chat.completions.create({

model:"gpt-4.1-mini",


messages:[

{
role:"system",
content:
"You create accurate summaries."
},

{
role:"user",
content:prompt
}

],


temperature:0.3


});



return (
response
.choices[0]
.message
.content
||
""
);


}