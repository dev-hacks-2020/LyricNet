from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
from autocomplete.autocomplete import get_next_word
from question.question import get_answer
from happytransformer import HappyBERT

bert = HappyBERT()

app = Flask(__name__)
CORS(app)


@app.route('/complete', methods=['GET'])
def complete():
    return jsonify({'word': get_next_word(request.args.get('input'), request.args.get('artist'))})


@app.route('/question', methods=['GET'])
def question():
    return jsonify({'answer': get_answer(request.args.get('question'), request.args.get('artist'), bert)})


@app.route('/generate/<artist>', methods=['GET'])
def generate(artist):
    return jsonify({})


if __name__ == '__main__':
    app.run(debug=True)
