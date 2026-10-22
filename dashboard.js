Chart.defaults.font.family = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
Chart.defaults.color = '#4f6b62';
Chart.defaults.maintainAspectRatio = false;
Chart.defaults.plugins.legend.labels.usePointStyle = true;
Chart.defaults.plugins.legend.labels.boxWidth = 8;

const verde = '#2e9e4f';
const verdeClaro = '#9bd8a8';
const azul = '#3d7ea6';
const laranja = '#e9a23b';
const turquesa = '#2a9d8f';
const marrom = '#a9714b';

const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

new Chart(document.getElementById('graficoMensal'), {
    type: 'line',
    data: {
        labels: meses,
        datasets: [
            {
                label: '2026',
                data: [820, 960, 1480, 1710, 1890, 1650, 900, 1720, 2210, 2380, null, null],
                borderColor: verde,
                backgroundColor: 'rgba(46,158,79,0.15)',
                fill: true,
                tension: 0.35,
                pointRadius: 3
            },
            {
                label: '2025',
                data: [700, 810, 1250, 1400, 1520, 1380, 780, 1430, 1790, 1960, 1840, 1100],
                borderColor: azul,
                borderDash: [5, 4],
                tension: 0.35,
                pointRadius: 2
            }
        ]
    },
    options: {
        interaction: { mode: 'index', intersect: false },
        scales: {
            y: { beginAtZero: true, grid: { color: '#edf3ef' } },
            x: { grid: { display: false } }
        }
    }
});

new Chart(document.getElementById('graficoResiduos'), {
    type: 'doughnut',
    data: {
        labels: ['Plástico', 'Papel', 'Vidro', 'Metal', 'Orgânico'],
        datasets: [{
            data: [34, 27, 12, 9, 18],
            backgroundColor: [azul, laranja, turquesa, '#8a96a3', marrom],
            borderWidth: 2,
            borderColor: '#fff'
        }]
    },
    options: {
        cutout: '62%',
        plugins: { legend: { position: 'bottom' } }
    }
});

new Chart(document.getElementById('graficoRpa'), {
    type: 'bar',
    data: {
        labels: ['RPA 1', 'RPA 2', 'RPA 3', 'RPA 4', 'RPA 5', 'RPA 6'],
        datasets: [{
            label: 'Ações',
            data: [38, 52, 71, 46, 59, 83],
            backgroundColor: [verdeClaro, verdeClaro, verdeClaro, verdeClaro, verdeClaro, verde],
            borderRadius: 6
        }]
    },
    options: {
        plugins: { legend: { display: false } },
        scales: {
            y: { beginAtZero: true, grid: { color: '#edf3ef' } },
            x: { grid: { display: false } }
        }
    }
});

new Chart(document.getElementById('graficoTemas'), {
    type: 'bar',
    data: {
        labels: ['Coleta seletiva', 'Água e rios', 'Manguezal', 'Arborização', 'Compostagem', 'Mudanças climáticas'],
        datasets: [{
            data: [78, 64, 51, 47, 33, 29],
            backgroundColor: turquesa,
            borderRadius: 4
        }]
    },
    options: {
        indexAxis: 'y',
        plugins: { legend: { display: false } },
        scales: {
            x: { max: 100, grid: { color: '#edf3ef' } },
            y: { grid: { display: false } }
        }
    }
});

new Chart(document.getElementById('graficoNivel'), {
    type: 'bar',
    data: {
        labels: ['1º tri', '2º tri', '3º tri', '4º tri'],
        datasets: [
            { label: 'Infantil', data: [820, 1100, 1350, 1210], backgroundColor: laranja },
            { label: 'Fundamental I', data: [2100, 2650, 3020, 2780], backgroundColor: verde },
            { label: 'Fundamental II', data: [1750, 2200, 2480, 2310], backgroundColor: turquesa },
            { label: 'Médio', data: [900, 1240, 1510, 1380], backgroundColor: azul }
        ]
    },
    options: {
        scales: {
            x: { stacked: true, grid: { display: false } },
            y: { stacked: true, grid: { color: '#edf3ef' } }
        }
    }
});

var btn_cor = document.querySelectorAll('.btn-cor');

btn_cor.forEach(function (botao) {
    var contador = 1;
    botao.addEventListener('click', mudarCor);
    
    function mudarCor(){
        if (contador == 1) {
            contador = 2;
            this.closest('.caixa').style.backgroundColor= '#dcfeff';
        } else if (contador == 2) {
            contador = 3;
            this.closest('.caixa').style.backgroundColor= '#dcffe1';
    
        } else if (contador == 3) {
            contador = 4;
            this.closest('.caixa').style.backgroundColor= '#f4dcff';

        } else if (contador == 4) {
            contador = 1;
            this.closest('.caixa').style.backgroundColor= 'white';
        }

        }
});