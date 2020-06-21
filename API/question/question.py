import random
import json
import os
import glob
from happytransformer import HappyBERT

text_files = glob.glob("./dataset/*.txt")

bert = HappyBERT()


def clean_name(file):
    name = file.split("/")[-1].split(".")[0]
    name = name.replace("-", " ")
    name = name.replace("_", " ")
    return name.lower()


name_to_text = dict((clean_name(text_file), text_file)
                    for text_file in text_files)


def get_answer(question: str, author: str, bert):
    try:
        json_file = name_to_text[author.lower()]
    except KeyError:
        return 404

    with open(json_file, "r") as file:
        text = file.read()

    return bert.answer_question(question, text[:1000])


# while True:
#     question = input('question: ')
#     artist = input('artist: ')
#     print(get_answer(question, artist))
