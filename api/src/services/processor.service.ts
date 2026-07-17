import axios from "axios";


interface ProcessorResponse {

    chunks:string[];

    count:number;

}



export async function processText(
    text:string
){

    const response =
    await axios.post<ProcessorResponse>(
        `${process.env.PROCESSOR_URL}/process`,
        {
            text
        }
    );


    return response.data;

}