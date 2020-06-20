from flask import Flask, jsonify, request, make_response
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/generate/<artist>', methods=['GET'])
def generate(artist):
    return jsonify({})


if __name__ == '__main__':
    app.run(debug=True)
