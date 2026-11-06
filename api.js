const BACK4APP = {
  url: "https://parseapi.back4app.com/classes/Meta",
  headers: {
    "X-Parse-Application-Id": "Y0pTldVD9jEUFoucWiaHKsNoMUbyQYvHtO9jKdUE",
    "X-Parse-Javascript-Key": "fCNW6cVKY0u82lhtj2YdJghE8Clbf9zDhvEzJqPB",
    "Content-Type": "application/json",
  },
};

async function listarMetas() {
  const res = await fetch(BACK4APP.url, { headers: BACK4APP.headers });
  if (!res.ok) throw new Error("Erro ao listar metas");
  const data = await res.json();
  return data.results;
}

async function criarMeta(meta) {
  const res = await fetch(BACK4APP.url, {
    method: "POST",
    headers: BACK4APP.headers,
    body: JSON.stringify(meta),
  });
  if (!res.ok) throw new Error("Erro ao criar meta");
  return res.json();
}

async function editarMeta(id, dados) {
  const res = await fetch(`${BACK4APP.url}/${id}`, {
    method: "PUT",
    headers: BACK4APP.headers,
    body: JSON.stringify(dados),
  });
  if (!res.ok) throw new Error("Erro ao editar meta");
  return res.json();
}

async function excluirMeta(id) {
  const res = await fetch(`${BACK4APP.url}/${id}`, {
    method: "DELETE",
    headers: BACK4APP.headers,
  });
  if (!res.ok) throw new Error("Erro ao excluir meta");
}