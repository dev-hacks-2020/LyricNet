import pronouncing
import markovify
import re
import random
import numpy as np
from keras.models import model_from_json

def compose_rap(lines, rhyme_list, lyrics_file, model):
    rap_vectors = []
    human_lyrics = split_lyrics_file(lyrics_file)
    initial_index = random.choice(range(len(human_lyrics) - 1))
    initial_lines = human_lyrics[initial_index:initial_index + 2]
    starting_input = []
    for line in initial_lines:
    	starting_input.append([words(line), rhyme(line, rhyme_list)])
    starting_vectors = model.predict(np.array([starting_input]).flatten().reshape(1, 2, 2))
    rap_vectors.append(starting_vectors)
    for i in range(20):
    	rap_vectors.append(model.predict(np.array([rap_vectors[-1]]).flatten().reshape(1, 2, 2)))
    return rap_vectors
    
def rhyme(line, rhyme_list):
    word = re.sub(r"\W+", '', line.split(" ")[-1]).lower()
    rhymeslist = pronouncing.rhymes(word)
    rhymeslistends = []
    for i in rhymeslist:
        rhymeslistends.append(i[-2:])
    try:
        rhymescheme = max(set(rhymeslistends), key=rhymeslistends.count)
    except Exception:
    	rhymescheme = word[-2:]
    try:
    	float_rhyme = rhyme_list.index(rhymescheme)
    	float_rhyme = float_rhyme / float(len(rhyme_list))
    	return float_rhyme
    except Exception:
    	float_rhyme = 0
    	return float_rhyme

def words(line):
    maxsyllables = 12
    count = 0
    for word in line.split(" "):
        vowels = 'aeiouy'
        word = word.lower()
        try:
            if word[0] in vowels:
                count +=1
        except IndexError:
            continue
        for index in range(1,len(word)):
            if word[index] in vowels and word[index-1] not in vowels:
                count +=1
        if word.endswith('e'):
            count -= 1
        if word.endswith('le'):
            count+=1
        if count == 0:
            count +=1
    return count / maxsyllables

def split_lyrics_file(text_file):
    text = open(text_file, encoding='utf-8').read()
    text = text.split("\n")
    while "" in text:
        text.remove("")
    return text

def rhymeindex(lyrics, artist):
    return open("./models/"+artist+"/"+artist+".rhymes", "r",encoding='utf-8').read().split("\n")

def generate_lyrics(text_model, text_file):
    bars = []
    last_words = []
    lyriclength = len(open(text_file,encoding='utf-8').read().split("\n"))
    count = 0
    markov_model = markov(text_file)
    while len(bars) < lyriclength / 9 and count < lyriclength * 2:
        bar = markov_model.make_sentence(max_overlap_ratio = .47, tries=300)
        if type(bar) != type(None) and words(bar) < 1:
            def get_last_word(bar):
                last_word = bar.split(" ")[-1]
                return last_word
            last_word = get_last_word(bar)
            if bar not in bars and last_words.count(last_word) < 3:
                bars.append(bar)
                last_words.append(last_word)
                count += 1
    return bars

def markov(text_file):
    read = open(text_file, "r", encoding='utf-8').read()
    text_model = markovify.NewlineText(read)
    return text_model

def vectors_into_song(vectors, generated_lyrics, rhyme_list):
    maxsyllables = 12
    def last_word_compare(rap, line2):
        penalty = 0 
        for line1 in rap:
            word1 = line1.split(" ")[-1]
            word2 = line2.split(" ")[-1]
            if word1 == word2:
                penalty += 0.2
        return penalty
    def calculate_score(vector_half, words, rhyme, penalty):
        desired_syllables = vector_half[0]
        desired_rhyme = vector_half[1]
        desired_syllables = desired_syllables * maxsyllables
        desired_rhyme = desired_rhyme * len(rhyme_list)
        if desired_syllables == None:
            print(1)
        if words == None:
            print(2)
        if desired_rhyme == None:
            print(3)
        if rhyme == None:
            print(4)
        score = 1.0 - abs(float(desired_syllables) - float(words)) + abs(float(desired_rhyme) - float(rhyme)) - penalty
        return score
    dataset = []
    for line in generated_lyrics:
        line_list = [line, words(line), rhyme(line, rhyme_list)]
        dataset.append(line_list)
    rap = []
    vector_halves = []
    for vector in vectors:
        vector_halves.append(list(vector[0][0])) 
        vector_halves.append(list(vector[0][1]))
    for vector in vector_halves:
        scorelist = []
        for item in dataset:
            line = item[0]
            if len(rap) != 0:
                penalty = last_word_compare(rap, line)
            else:
                penalty = 0
            total_score = calculate_score(vector, item[1], item[2], penalty)
            score_entry = [line, total_score]
            scorelist.append(score_entry)
        fixed_score_list = [0]
        for score in scorelist:
            fixed_score_list.append(float(score[1]))
        max_score = max(fixed_score_list)
        for item in scorelist:
            if item[1] == max_score:
                rap.append(item[0])
                print (str(item[0]))
                for i in dataset:
                    if item[0] == i[0]:
                        dataset.remove(i)
                        break
                break     
    return rap

def get_song(artist):
  artist = artist.lower()
  model = "./models/"+artist+"/"+artist+".json"
  weights = "./models/"+artist+"/"+artist+".h5"
  text_file = "./models/"+artist+"/"+artist+".txt"
  json_file = open(model, 'r')
  loaded_model_json = json_file.read()
  json_file.close()
  model = model_from_json(loaded_model_json)
  model.load_weights(weights)
  text_model = markov(text_file)
  bars = generate_lyrics(text_model, text_file)
  rhyme_list = rhymeindex(bars, artist)
  vectors = compose_rap(bars, rhyme_list, text_file, model)
  rap = vectors_into_song(vectors, bars, rhyme_list)
  return rap

artist = 'radiohead'
get_song(artist)
