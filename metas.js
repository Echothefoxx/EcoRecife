// Troque pelos dados reais usados no gráfico "Ações por RPA"
const acoesRealizadas = { "RPA 1": 12, "RPA 2": 8, "RPA 3": 15, "RPA 4": 6, "RPA 5": 10, "RPA 6": 9 };

const tbody = document.getElementById("metas-tbody");
const campoId = document.getElementById("meta-id");
const campoRpa = document.getElementById("meta-rpa");
const campoValor = document.getElementById("meta-valor");
const campoNota = document.getElementById("meta-anotacao");
const btnSalvar = document.getElementById("meta-salvar");
const btnCancelar = document.getElementById("meta-cancelar");

let metasCache = [];

async function carregarMetas() {
  try {
    metasCache = await listarMetas();
    renderizarMetas();
  } catch (e) {
    tbody.innerHTML = `<tr><td colspan="6">Não foi possível carregar as metas.</td></tr>`;
  }
}

function renderizarMetas() {
  tbody.innerHTML = "";
  metasCache.forEach((m) => {
    const feito = acoesRealizadas[m.rpa] ?? 0;
    const pct = m.valorMeta > 0 ? Math.min(100, Math.round((feito / m.valorMeta) * 100)) : 0;
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${m.rpa}</td>
      <td>${m.valorMeta}</td>
      <td>${feito}</td>
      <td><progress value="${pct}" max="100"></progress> ${pct}%</td>
      <td></td>
      <td>
        <button data-acao="editar" data-id="${m.objectId}">Editar</button>
        <button data-acao="excluir" data-id="${m.objectId}">Excluir</button>
      </td>`;
    tr.children[4].textContent = m.anotacao || "";
    tbody.appendChild(tr);
  });
}

function limparFormulario() {
  campoId.value = "";
  campoValor.value = "";
  campoNota.value = "";
  btnSalvar.textContent = "Salvar";
  btnCancelar.hidden = true;
}

btnSalvar.addEventListener("click", async () => {
  const dados = {
    rpa: campoRpa.value,
    valorMeta: Number(campoValor.value),
    anotacao: campoNota.value.trim(),
  };
  if (!dados.valorMeta) return alert("Informe o valor da meta.");

  try {
    if (campoId.value) await editarMeta(campoId.value, dados);
    else await criarMeta(dados);
    limparFormulario();
    carregarMetas();
  } catch (e) {
    alert(e.message);
  }
});

btnCancelar.addEventListener("click", limparFormulario);

tbody.addEventListener("click", async (ev) => {
  const btn = ev.target.closest("button");
  if (!btn) return;
  const id = btn.dataset.id;

  if (btn.dataset.acao === "excluir") {
    if (!confirm("Excluir esta meta?")) return;
    try { await excluirMeta(id); carregarMetas(); } catch (e) { alert(e.message); }
  }

  if (btn.dataset.acao === "editar") {
    const m = metasCache.find((x) => x.objectId === id);
    campoId.value = m.objectId;
    campoRpa.value = m.rpa;
    campoValor.value = m.valorMeta;
    campoNota.value = m.anotacao || "";
    btnSalvar.textContent = "Atualizar";
    btnCancelar.hidden = false;
  }
});

carregarMetas();