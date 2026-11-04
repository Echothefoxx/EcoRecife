

    let editBnt = document.getElementById('edit-btn');
    let caixaOptions = document.querySelectorAll('.options');
    caixaOptions.forEach(caixa => caixa.style.display = 'none');

    let editBntActived = false;
    editBnt.addEventListener("click", podeEditar);

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




        GridStack.init({
            cellHeight: 100,
            margin: 8,
            columnOpts: { breakpoints: [{ w: 700, c: 1 }, { w: 1000, c: 2 }] }
        });
