// Fetch the coin list when the page loads
document.addEventListener('DOMContentLoaded', function () {
    fetchCoinList();
});

async function fetchCoinList() {
    const apiKey = '-env-Integrate-Limusa-Open.README'; // 
    const url = `https://min-api.cryptocompare.com/data/all/coinlist?api_key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Extract the coin list from the data
        const coins = data.Data;

        // Create the table headers
        let tableHTML = `<table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Symbol</th>
                                <th>Name</th>
                                <th>Algorithm</th>
                            </tr>
                        </thead>
                        <tbody>`;

        for (const key in coins) {
            if (coins.hasOwnProperty(key)) {
                const coin = coins[key];
                tableHTML += `<tr>
                            <td>${coin.Symbol}</td>
                            <td>${coin.CoinName}</td>
                            <td>${coin.Algorithm}</td>
                          </tr>`;
            }
        }

        tableHTML += `</tbody></table>`;

        // Insert the table into the coinList div and remove the "Loading..." text
        document.getElementById('coinList').innerHTML = tableHTML;

    } catch (error) {
        document.getElementById('coinList').innerHTML = `<div class="alert alert-danger" role="alert">
        Error fetching data: ${error.message}
    </div>`;
    }
}

// Fetch cryptocurrency data and plot the chart based on user input
document.getElementById('fetchPriceBtn').addEventListener('click', function () {
    const symbol = document.getElementById('cryptoInput').value.toUpperCase();
    fetchCryptoData(symbol);
    plotCryptoChart(symbol);
});

async function fetchCryptoData(symbol) {
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=USD,EUR`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === 'Error') {
            document.getElementById('cryptoData').innerHTML = `<div class="alert alert-danger" role="alert">
            ${data.Message}
        </div>`;
        } else {
            const displayData = data.DISPLAY[symbol];
            const answer = { symbol: symbol, currencies: [] };

            let tableHTML = `<table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Currency</th>
                                    <th>Price</th>
                                    <th>Change 24H</th>
                                    <th>Market Cap</th>
                                </tr>
                            </thead>
                            <tbody>`;

            // Loop through each currency (e.g., USD, EUR) and display its data
            for (const currency in displayData) {
                if (displayData.hasOwnProperty(currency)) {
                    const coinData = displayData[currency];
                    answer.currencies.push({
                        currency: currency,
                        price: coinData.PRICE,
                        change24h: coinData.CHANGE24HOUR,
                        marketCap: coinData.MKTCAP
                    });
                    tableHTML += `<tr>
                                <td>${currency}</td>
                                <td>${coinData.PRICE}</td>
                                <td>${coinData.CHANGE24HOUR}</td>
                                <td>${coinData.MKTCAP}</td>
                              </tr>`;
                }
            }

            tableHTML += `</tbody></table>`;

            // Insert the table into the cryptoData div
            document.getElementById('cryptoData').innerHTML = tableHTML;



        }
    } catch (error) {
        document.getElementById('cryptoData').innerHTML = `<div class="alert alert-danger" role="alert">
        Error fetching data: ${error.message}
    </div>`;
    }
}

//approved chart
async function plotCryptoChart(symbol) {
    const url = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${symbol}&tsym=USD&limit=6`; // Fetch last 7 days

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === 'Error') {
            document.getElementById('cryptoData').innerHTML += `<div class="alert alert-danger" role="alert">
            ${data.Message}</div>`;
        } else {
            const dates = data.Data.Data.map(item => new Date(item.time * 1000).toLocaleDateString());
            const prices = data.Data.Data.map(item => item.close);

            // If a chart already exists, destroy it before creating a new one
            if (typeof window.cryptoChart !== 'undefined' && window.cryptoChart instanceof Chart) {
                window.cryptoChart.destroy();
            }

            // Create the chart
            const ctx = document.getElementById('cryptoChart').getContext('2d');
            window.cryptoChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [{
                        label: `${symbol} Price (Last 7 Days)`,
                        data: prices,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 2,
                        fill: false
                    }]
                },
                options: {
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Date'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Price (USD)'
                            }
                        }
                    }
                }
            });
        }
    } catch (error) {
        document.getElementById('cryptoData').innerHTML += `<div class="alert alert-danger" role="alert">
        Error fetching chart data: ${error.message}
    </div>`;
    }
}
// Handle the AI report generation button click
document.getElementById('generateReportBtn').addEventListener('click', async function () {
    const symbol = document.getElementById('cryptoInput').value.toUpperCase();

    if (!symbol) {
        alert('Please enter a cryptocurrency symbol.');
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:5000/process', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ symbol: symbol }),
        });

        if (response.ok) {
            const data = await response.json();
            document.getElementById('report').innerText = data.result;
        } else {
            document.getElementById('report').innerText = 'Error fetching report. You exceeded your current quota, please check your plan and billing details. For more information on this error, read the docs: https://platform.openai.com/docs/guides/error-codes/api-errors';
        }
    } catch (error) {
        document.getElementById('report').innerText = 'Error: You exceeded your current quota, please check your plan and billing details. For more information on this error, read the docs: https://platform.openai.com/docs/guides/error-codes/api-errors' + error.message;
    }
});

