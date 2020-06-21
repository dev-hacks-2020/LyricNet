import random
import json
import os
import glob

json_files = glob.glob("jsons/*.json")


def clean_name(file):
    name = file.split("/")[-1].split(".")[0]
    name = name.replace("-", " ")
    name = name.replace("_", " ")
    return name.lower()


name_to_json = dict((clean_name(json_file), json_file) for json_file in json_files)


def get_next_word(input_word, author: str):
    try:
        json_file = name_to_json[author.lower()]
    except KeyError:
        return 404

    with open(json_file, "r") as file:
        dictionary = json.load(file)

    if input_word not in dictionary:
        input_word = dictionary[random.choice(list(dictionary.keys()))]
    else:
        candidates = dictionary[input_word]
        candidates_normed = []

        for word in candidates:
            freq = candidates[word]
            for _ in range(0, freq):
                candidates_normed.append(word)

        input_word = random.choice(candidates_normed)
    return input_word

# for i in range(50):
#     print(get_next_word("world", "disney"), end=" ")

