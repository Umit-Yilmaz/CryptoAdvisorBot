# CryptoAdvisorBot
This repo includes a simple finance recommendation site using Cryptocompare and OpenAI API.

Sure, here’s a `README.md` file for your cryptocurrency project:

---

# Cryptocurrency Data and Analysis Tool

This project is a web-based tool that fetches and displays cryptocurrency data, including real-time prices and historical trends, and provides AI-generated trading advice using the OpenAI API.

## Features

- **Fetch Coin List:** Displays a list of available cryptocurrencies along with their symbols, names, and algorithms.
- **Fetch Real-Time Prices:** Retrieves and displays the latest prices, market cap, and 24-hour price changes for a specific cryptocurrency.
- **Historical Price Chart:** Plots the price of a selected cryptocurrency over the last 7 days.
- **AI-Generated Trading Advice:** Uses OpenAI's GPT-3.5-turbo model to provide trading advice based on the latest cryptocurrency data.

## Prerequisites

- **Python 3.6+**
- **Node.js** and **npm**
- **Flask:** A lightweight WSGI web application framework.
- **OpenAI API Key:** To interact with OpenAI's models.
- **Cryptocompare API Key:** For fetching cryptocurrency data.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/crypto-analysis-tool.git
   cd crypto-analysis-tool
   ```

2. **Install Python dependencies:**

   ```bash
   pip install flask requests flask-cors openai
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

   ```bash
   python app.py
   ```

2. **Open the web application:**

   Open `index.html` in your web browser or start a local server using Node.js or Python:

   ```bash
   npm start
   ```

   or

   ```bash
   python -m http.server
   ```

3. **Fetch Cryptocurrency Data:**

   - The main page displays a list of all available cryptocurrencies.
   - Enter a cryptocurrency symbol (e.g., BTC for Bitcoin) and click the "Fetch Prices" button to retrieve real-time price data and historical charts.

4. **Generate AI Trading Report:**

   - After fetching the cryptocurrency data, click the "Generate AI Report" button to receive trading advice based on the selected cryptocurrency.

## Project Structure

- **`index.html`**: The main HTML file for the web interface.
- **`index.js`**: Contains JavaScript code for fetching data, handling user interactions, and plotting charts.
- **`app.py`**: The Flask backend that interacts with the Cryptocompare API and the OpenAI API to process data and generate reports.
- **`style.css`**: Contains the CSS styling for the web application.

## API Endpoints

- **GET `/process`**: Fetches the cryptocurrency data and generates an AI trading report.

## Error Handling

- **Cryptocompare API Errors**: If the cryptocurrency data cannot be fetched, an error message will be displayed.
- **OpenAI API Errors**: If the AI report generation fails, an error message with details will be shown.

## Known Issues

- **API Limits**: Ensure that you monitor your API usage and do not exceed the rate limits set by OpenAI and Cryptocompare.
- **CORS Issues**: If running on a different domain, ensure that CORS is properly configured in the Flask app.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## Contributing

If you wish to contribute, please fork the repository and create a pull request with your changes. Contributions are welcome!

---

This `README.md` should provide a comprehensive overview of your project, covering installation, usage, and key features. You can customize it further to match your specific requirements.
