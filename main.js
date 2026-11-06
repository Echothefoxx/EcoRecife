let grid = GridStack.init({
    cellHeight: 100,
    margin: 8,
    columnOpts: { breakpoints: [{ w: 700, c: 1 }, { w: 1000, c: 2 }] }
});

let editBnt = document.getElementById('edit-btn');
let caixaOptions = [];

let editBntActived = false;
editBnt.addEventListener("click", podeEditar);

let restartBnt = document.getElementById('restart-btn');
restartBnt.addEventListener("click", restartDashboard);

let inputPesquisa = document.getElementById('pesquisa');

inputPesquisa.addEventListener('input', function () {
    let valor = inputPesquisa.value.toLowerCase();
    let cards = document.querySelectorAll('.grid-stack-item');

    cards.forEach(function (card) {
        if (card.textContent.toLowerCase().includes(valor)) {
            card.style.opacity = '1';
            card.style.filter = 'none';
        } else {
            card.style.opacity = '0.4';
            card.style.filter = 'brightness(40%)';
        }
    });

    let linhas = document.querySelectorAll('#metas-tbody tr');
    linhas.forEach(function (linha) {
        if (linha.textContent.toLowerCase().includes(valor)) {
            linha.style.opacity = '1';
            linha.style.filter = 'none';
        } else {
            linha.style.opacity = '0.4';
            linha.style.filter = 'brightness(40%)';
        }
    });
});

carregarDashboard();

function carregarDashboard() {
    fetch('dashboard-padrao.json')
        .then(resposta => resposta.json())
        .then(dados => {
            document.querySelectorAll('canvas').forEach(canvas => Chart.getChart(canvas)?.destroy());
            graficosRegistrados.length = 0;
            grid.removeAll();
            grid.load(dados);
            iniciarBotoes();
            if (typeof renderizarMetas === 'function') renderizarMetas();
        });
}

function restartDashboard() {
    editBntActived = false;
    editBnt.style.backgroundColor='#ffff';
    inputPesquisa.value = '';
    carregarDashboard();
}

function iniciarBotoes() {
    caixaOptions = document.querySelectorAll('.options');
    caixaOptions.forEach(caixa => caixa.style.display = 'none');

    let buttonDelete = document.querySelectorAll('.btn-delete');
    buttonDelete.forEach(botao => {
        botao.addEventListener("click", deleteWidget);
    })

    var btn_cor = document.querySelectorAll('.btn-cor');

    btn_cor.forEach(function (botao) {
        var contador = 1;
        botao.addEventListener('click', mudarCor);

        function mudarCor(){
            if (contador == 1) {
                contador = 2;
                this.closest('.caixa, .card').style.backgroundColor= '#dcfeff';
            } else if (contador == 2) {
                contador = 3;
                this.closest('.caixa, .card').style.backgroundColor= '#dcffe1';

            } else if (contador == 3) {
                contador = 4;
                this.closest('.caixa, .card').style.backgroundColor= '#f4dcff';

            } else if (contador == 4) {
                contador = 1;
                this.closest('.caixa, .card').style.backgroundColor= 'white';
            }

        }
    });
}

function podeEditar() {
    if (editBntActived == false) {
        editBntActived = true;
        editBnt.style.backgroundColor='#09e62a';
        caixaOptions.forEach(caixa => caixa.style.display = 'flex');
    } else {
        editBntActived = false;
        caixaOptions.forEach(caixa => caixa.style.display = 'none');
        editBnt.style.backgroundColor='#ffff';
    }
}

function deleteWidget(event) {
    let grid = GridStack.init();
    let widget = event.currentTarget.closest('.grid-stack-item');
    grid.removeWidget(widget);
}
