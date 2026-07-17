import {
Request,
Response,
NextFunction
}
from "express";


import {
summarySchema
}
from "../validators/summary.validator";


import {
generateSummary
}
from "../services/openai.services";


import {
processText
}
from "../services/processor.service";



export async function summarise(

req:Request,

res:Response,

next:NextFunction

){


try{


const data =
summarySchema.parse(
req.body
);



//
// Step 1
// Clean and chunk
//

const processed =
await processText(
data.text
);



//
// Step 2
// Summarise chunks
//

const summaries=[];


for(
const chunk of processed.chunks
){


const result =
await generateSummary(

chunk,

{
length:data.length,
tone:data.tone
}

);


summaries.push(result);


}




//
// Step 3
// Combine summaries
//

const finalSummary =
await generateSummary(

summaries.join("\n"),

{
length:data.length,
tone:data.tone
}

);



res.json({

summary:finalSummary,


stats:{

inputWords:
data.text
.split(/\s+/)
.length,


chunks:
processed.count,


summaryWords:
finalSummary
.split(/\s+/)
.length

}


});


}
catch(error){

next(error);

}


}