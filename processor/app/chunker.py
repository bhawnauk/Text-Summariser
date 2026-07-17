import spacy

from app.tokenizer import count_tokens



nlp = spacy.load(
    "en_core_web_sm"
)



MAX_TOKENS = 1500



def create_chunks(text:str):


    doc = nlp(text)


    chunks=[]

    current=""

    current_tokens=0



    for sentence in doc.sents:


        sentence_text = sentence.text


        sentence_tokens = count_tokens(
            sentence_text
        )


        if (
            current_tokens
            +
            sentence_tokens
            >
            MAX_TOKENS
        ):


            chunks.append(
                current.strip()
            )


            current=""
            current_tokens=0



        current += (
            " "
            +
            sentence_text
        )


        current_tokens += sentence_tokens



    if current:

        chunks.append(
            current.strip()
        )


    return chunks