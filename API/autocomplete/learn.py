import itertools
import json
import os
import glob

text_files = glob.glob("../data/*.txt")


def get_dictionary(words: list, result_dictionary=None):
    if result_dictionary is None:
        result_dictionary = {}
    for i in range(len(words) - 1):
        word = words[i]
        next_word = words[i + 1]

        if word in result_dictionary:
            if next_word in result_dictionary[word]:
                result_dictionary[word][next_word] += 1
            else:
                result_dictionary[word][next_word] = 1
        else:
            result_dictionary[word] = {next_word: 1}
    return result_dictionary


for i, file in enumerate(text_files):
    name = file.split("/")[-1].split(".")[0].replace("_", "-")
    json_out = f"jsons/{name.lower()}.json"

    print(f"{name}: ({i+1}/{len(text_files)})", end=" --> ")

    if not os.path.exists(json_out):
        open(json_out, "x").close()
        with open(file, "r") as f:
            word_list = list(map(lambda l: l.split(" "), f.read().splitlines()))
            dictionary = get_dictionary(list(itertools.chain.from_iterable(word_list)))
        print("CREATED")
    else:
        with open(json_out, "r") as temp:
            old_dictionary = json.load(temp)
        dictionary = get_dictionary(file, old_dictionary)
        print("ADDED")

    with open(json_out, "w") as out:
        json.dump(dictionary, out)

