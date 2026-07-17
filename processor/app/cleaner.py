import re

from bs4 import BeautifulSoup



def clean_text(text:str):


    # remove HTML

    soup = BeautifulSoup(
        text,
        "html.parser"
    )


    text=soup.get_text()



    # remove extra spaces

    text=re.sub(
        r"\s+",
        " ",
        text
    )


    # trim

    text=text.strip()


    return text