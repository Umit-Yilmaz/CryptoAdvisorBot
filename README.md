# Cryptocurrency Data and Analysis Tool

This repo includes a simple finance recommendation site using Cryptocompare and OpenAI API.

---

This project is a web-based tool that fetches and displays cryptocurrency data, including real-time prices and historical trends, and provides AI-generated trading advice using the OpenAI API.

## Features

- **Fetch Coin List:** Displays a list of available cryptocurrencies along with their symbols, names, and algorithms.
- **Historical Price Chart:** Plots the price of a selected cryptocurrency over the last 7 days.
- **AI-Generated Trading Advice:** Uses OpenAI's GPT-3.5-turbo model to provide trading advice based on the latest cryptocurrency data.

## Prerequisites

- **Flask:** A lightweight WSGI web application framework.
- **OpenAI API Key:** To interact with OpenAI's models.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Umit-Yilmaz/CryptoAdvisorBot.git
   cd crypto-analysis-tool
   ```

2. **Install Python dependencies:**

   ```bash
  pip install -r requirements.txt
   ```

3. **Install JavaScript dependencies:**

   ```bash
   npm install
   ```

4. **Set up environment variables:**

   Create a `.env` file in the project root and add your API keys:

   ```
   OPENAI_API_KEY=your_openai_api_key
   CRYPTOCOMPARE_API_KEY=your_cryptocompare_api_key
   ```

## Usage

1. **Start the Flask server:**
   Go to project directory and write:

   ```bash
   python app.py
   ```

3. **Open the web application:**

   Open `index.html` in your web browser or start a local server using Node.js or just clicking:

   ```bash
   npm start
   ```

4. **Fetch Cryptocurrency Data:**

   - The main page displays a list of all available cryptocurrencies.
   - Enter a cryptocurrency symbol (e.g., BTC for Bitcoin) and click the "Fetch Prices" button to retrieve real-time price data and historical charts.

5. **Generate AI Trading Report:**

   - After fetching the cryptocurrency data, click the "Generate AI Report" button to receive trading advice based on the selected cryptocurrency.


## API Endpoint

- **GET `/process`**: Fetches the cryptocurrency data and generates an AI trading report.

## Error Handling

- **Cryptocompare API Errors**: If the cryptocurrency data cannot be fetched, an error message will be displayed.
- **OpenAI API Errors**: If the AI report generation fails, an error message with details will be shown.

## Known Issues

- **API Limits**: Ensure that you monitor your API usage and do not exceed the rate limits set by OpenAI and Cryptocompare (which I've encountered this problem before)
- **CORS Issues**: If running on a different domain, ensure that CORS is properly configured in the Flask app.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## Contributing

If you wish to contribute, please fork the repository and create a pull request with your changes. Contributions are welcome!

---

