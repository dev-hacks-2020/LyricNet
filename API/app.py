from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
from autocomplete.autocomplete import get_next_word
from question.question import get_answer
from happytransformer import HappyBERT
from autocomplete.learn import train_custom
from complete_my_song.autocomplete_generator import generate_main
from lyrics_generation.generator import get_song
import glob

bert = HappyBERT()

app = Flask(__name__)
CORS(app)


@app.route('/complete-markov-artists', methods=['GET'])
def complete_markov_artists():
    json_files = glob.glob("./autocomplete/jsons/*.json")
    return jsonify(sorted(list(map(lambda file: file[21:-5].replace('-', ' ').title(), json_files))))


@app.route('/complete-gru-artists', methods=['GET'])
def complete_gru_artists():
    return jsonify([])
    # json_files = glob.glob("./autocomplete/jsons/*.json")
    # return jsonify(sorted(list(map(lambda file: file[21:-5].replace('-', ' ').title(), json_files))))


@app.route('/complete-markov', methods=['GET'])
def complete():
    return jsonify({'word': get_next_word(request.args.get('input'), request.args.get('artist'))})


@app.route('/complete-markov', methods=['POST'])
def complete_markov_train():
    data = request.get_json(force=True)
    train_custom(data['artist'], data['songs'])
    return jsonify({'message': 'success'})


@app.route('/complete-gru', methods=['POST'])
def complete_gru_train():
    data = request.get_json(force=True)
    generate_main(data['artist'], data['songs'], data)
    return jsonify({'message': 'success'})


@app.route('/question', methods=['GET'])
def question():
    return jsonify({'answer': get_answer(request.args.get('question'), request.args.get('artist'), bert)})


@app.route('/generate', methods=['GET'])
def generate():
    return jsonify({'lyrics': get_song(request.args.get('artist'), int(request.args.get('lines')), int(request.args.get('syllables')))})


if __name__ == '__main__':
    app.run(debug=True)
