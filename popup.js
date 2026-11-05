// precisa de: grid e iniciarBotoes() do main.js, e do dashboard-padrao.json

const popup = document.getElementById("popup");

document.getElementById("abrir").addEventListener("click", () => {
    popup.showModal();
});

document.getElementById("cancelar").addEventListener("click", () => {
    popup.close();
});

document.getElementById("confirmar").addEventListener("click", () => {
    const escolhido = document.querySelector('input[name="tipo"]:checked').value;

    fetch('dashboard-padrao.json')
        .then(resposta => resposta.json())
        .then(dados => {
            const novo = dados.find(widget => widget.id === escolhido);
            novo.id = novo.id + '-' + Date.now();
            novo.x = 0;
            novo.y = grid.getRow();

            const widget = grid.addWidget(novo);
            iniciarBotoes(widget);
            widget.scrollIntoView({ behavior: 'smooth' });
        });

    popup.close();
});
