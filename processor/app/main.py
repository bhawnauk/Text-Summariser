from fastapi import FastAPI
from pydantic import BaseModel
from app.cleaner import clean_text
from app.chunker import create_chunks


app = FastAPI(
    title="SummarAI Processor"
)


class TextRequest(BaseModel):

    text:str



@app.get("/")
def home():

    return {
        "message":"Processor running"
    }



@app.post("/process")
def process_text(
    request:TextRequest
):

    cleaned = clean_text(
        request.text
    )


    chunks = create_chunks(
        cleaned
    )


    return {

        "chunks":chunks,

        "count":len(chunks)

    }