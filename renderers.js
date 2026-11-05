// renderers.js — transforma cada widget do JSON em HTML
// Fluxo: grid.load(json) -> GridStack.renderCB -> função do registro -> HTML na tela

// Visual padrão de todos os gráficos
Chart.defaults.font.family = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
Chart.defaults.color = '#4f6b62';
Chart.defaults.maintainAspectRatio = false;
Chart.defaults.plugins.legend.labels.usePointStyle = true;
Chart.defaults.plugins.legend.labels.boxWidth = 8;

// Botões que aparecem ao passar o mouse (trocar cor e apagar), iguais em todo widget
const BOTOES = `
<div class="options">
    <button class="btn-cor"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M440-80q-33 0-56.5-23.5T360-160v-160H240q-33 0-56.5-23.5T160-400v-280q0-66 47-113t113-47h480v440q0 33-23.5 56.5T720-320H600v160q0 33-23.5 56.5T520-80h-80ZM240-560h480v-200h-40v160h-80v-160h-40v80h-80v-80H320q-33 0-56.5 23.5T240-680v120Zm0 160h480v-80H240v80Zm0 0v-80 80Z"/></svg></button>
    <button class="btn-delete"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></svg></button>
</div>`;

// Card com um número
function renderStatCard(contentEl, widget) {
    const { title, dataSource } = widget.config;

    contentEl.classList.add('card');
    contentEl.innerHTML = `<div class="card-info"><span></span><strong></strong></div>${BOTOES}`;
    // textContent (e não innerHTML) para o texto: evita injeção de HTML vindo do banco
    contentEl.querySelector('span').textContent = title;
    contentEl.querySelector('strong').textContent = dataSource.value.toLocaleString('pt-BR');
}

// Gráfico de qualquer tipo: o parâmetro "tipo" é o type do Chart.js ('line', 'bar' ou 'doughnut')
function renderGrafico(contentEl, widget, tipo) {
    const { title, subtitle = '', dataSource, options = {} } = widget.config;
    const { seriesStyle = [], horizontal, stacked, showLegend = true, maxValue, borderRadius = 0, cutout = '62%' } = options;

    contentEl.classList.add('caixa');
    contentEl.innerHTML = `
        <div class="caixa-info"><div><h3></h3><p></p></div>${BOTOES}</div>
        <div class="area"><canvas></canvas></div>`;
    contentEl.querySelector('h3').textContent = title;
    contentEl.querySelector('p').textContent = subtitle;

    // Uma série do JSON vira um dataset do Chart.js (o Chart.js ignora o que não se aplica ao tipo)
    const datasets = dataSource.series.map((s, i) => {
        const { color, fill, dashed, pointRadius = 3 } = seriesStyle[i] ?? {};
        return {
            label: s.label,
            data: s.data,
            backgroundColor: tipo === 'line' ? color + '26' : color,  // linha: mesma cor com 15% de opacidade
            borderColor: tipo === 'line' ? color : '#fff',
            fill: !!fill,
            borderDash: dashed ? [5, 4] : [],
            tension: 0.35,
            pointRadius,
            borderRadius
        };
    });

    // Dois eixos: valores (números) e categorias (nomes). Barras deitadas trocam x e y.
    const eixoValor = { beginAtZero: true, stacked, max: maxValue, grid: { color: '#edf3ef' } };
    const eixoCategoria = { stacked, grid: { display: false } };
    const scales = tipo === 'doughnut' ? {}
        : horizontal ? { x: eixoValor, y: eixoCategoria }
        : { x: eixoCategoria, y: eixoValor };

    new Chart(contentEl.querySelector('canvas'), {
        type: tipo,
        data: { labels: dataSource.labels, datasets },
        options: {
            indexAxis: horizontal ? 'y' : 'x',
            cutout,
            scales,
            interaction: tipo === 'line' ? { mode: 'index', intersect: false } : {},
            plugins: { legend: { display: showLegend, position: tipo === 'doughnut' ? 'bottom' : 'top' } }
        }
    });
}

// Registro: type do JSON -> função que desenha.
// Tipo novo = uma função nova + uma linha aqui.
const widgetRenderers = {
    'stat-card': renderStatCard,
    'line-chart': (contentEl, widget) => renderGrafico(contentEl, widget, 'line'),
    'doughnut-chart': (contentEl, widget) => renderGrafico(contentEl, widget, 'doughnut'),
    'bar-chart': (contentEl, widget) => renderGrafico(contentEl, widget, 'bar')
};

// Gancho do GridStack: chamado para cada widget criado (load ou addWidget).
// O "?." ignora tipos que não existem no registro, em vez de quebrar a página.
GridStack.renderCB = (contentEl, widget) => widgetRenderers[widget.type]?.(contentEl, widget);
