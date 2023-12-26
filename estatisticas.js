// Substitua 'YOUR_GOOGLE_SHEETS_URL' pela URL da sua planilha do Google Sheets
const publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1ZajaGs-4iguGRFmsVXMcN7vpzRh-LyRj9Hdp6Q9PGZ8/edit#gid=0';

function init() {
    Tabletop.init({
        key: publicSpreadsheetUrl,
        callback: showInfo,
        simpleSheet: true
    });
}

function showInfo(data, tabletop) {
    // Exemplo de dados no console
    console.log(data);

    // Processar os dados conforme necessário para criar os gráficos
    const labels = data.map(entry => entry.Label);
    const values = data.map(entry => entry.Value);

    // Configuração do gráfico
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Valores',
                data: values,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

window.addEventListener('DOMContentLoaded', init);
