from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
from autocomplete.autocomplete import get_next_word
from question.question import get_answer
from happytransformer import HappyBERT
from autocomplete.learn import train_custom
import glob

bert = HappyBERT()

app = Flask(__name__)
CORS(app)


@app.route('/complete-artists', methods=['GET'])
def complete_artist():
    json_files = glob.glob("./autocomplete/jsons/*.json")
    return jsonify(sorted(list(map(lambda file: file[21:-5].replace('-', ' ').title(), json_files))))


@app.route('/complete', methods=['GET'])
def complete():
    return jsonify({'word': get_next_word(request.args.get('input'), request.args.get('artist'))})


@app.route('/complete', methods=['POST'])
def complete_train():
    data = request.get_json(force=True)
    train_custom(data['artist'], data['songs'])
    return jsonify({'message': 'success'})


@app.route('/question', methods=['GET'])
def question():
    return jsonify({'answer': get_answer(request.args.get('question'), request.args.get('artist'), bert)})


@app.route('/generate', methods=['GET'])
def generate():
    return jsonify({})


if __name__ == '__main__':
    app.run(debug=True)
