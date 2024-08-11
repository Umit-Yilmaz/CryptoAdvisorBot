from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
from openai import OpenAI
import os

app = Flask(__name__)
CORS(app)

client = OpenAI()

@app.route('/process', methods=['POST'])
def process_data():
    try:
        if request.content_type != 'application/json':
            return jsonify({'error': 'Unsupported Media Type'}), 415

        data = request.json
        symbol = data.get('symbol')

        # Check if symbol is provided
        if not symbol:
            return jsonify({'error': 'Symbol is required'}), 400

        # Fetch cryptocurrency data
        crypto_data_url = f'https://min-api.cryptocompare.com/data/pricemultifull?fsyms={symbol}&tsyms=USD,EUR'
        response = requests.get(crypto_data_url)

        # Check if the request was successful
        if response.status_code != 200:
            return jsonify({'error': 'Failed to fetch crypto data'}), 500

        crypto_data = response.json()

        # Prepare the content for the OpenAI API
        content = f"Give me trading advice for {symbol} and for their values {crypto_data}"

        # Call the OpenAI API with the correct parameters
        result = client.chat.completions.create(
            model="gpt-3.5-turbo",  # Specify the model to use
            messages=[
                {"role": "system", "content": "You are a trader, skilled in explaining complex trading with specific coins."},
                {"role": "user", "content": content}
            ]
        )

        # Extract the message from the response
        completion_message = result['choices'][0]['message']['content']

        return jsonify({'result': completion_message})

    except Exception as e:
        # Log the error
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
