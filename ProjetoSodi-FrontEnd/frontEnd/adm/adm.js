const status_aberta = document.querySelector("#aberta");
const status_manutecao = document.querySelector("#manutencao");
const status_concluido = document.querySelector("#concluida");
const vaziaordem = document.querySelector("#vaziaordem");
const modal_maquina = document.querySelector("#modal_maquina");
const botaoAbrirMaqui = document.querySelector("#maquina_cad");
const botaoFecharmaqui = document.querySelector("#fechar_modalMaqui");
const cad_maquina = document.querySelector("#cadastro_maquina");
const ul_lateral = document.querySelectorAll("#barralateral li");
const status_triplo = document.querySelector("#divstatus");
const logout = document.querySelector('#logout')
const user = localStorage.getItem('id');
const Api = "http://192.168.1.5:3000"

//Modal cadastro maquina
botaoAbrirMaqui.addEventListener("click", function () {
  modal_maquina.classList.add("ativo");
});

botaoFecharmaqui.addEventListener("click", function () {
  modal_maquina.classList.remove("ativo");
});

//Metodo GET para mostrar as ordens abertas
status_aberta.addEventListener("click", async () => {
  vaziaordem.innerHTML = "";
  const resposta = await fetch(`${Api}/statusAberta`);
  const listagem = await resposta.json();
  listagem.forEach((element) => {
    const div = document.createElement("div_ordem");
    div.innerHTML = `
    <h1>${element.nome_mecanico}</h1>
    <p>${element.data_abertura}</p>
    <p>${element.descricao_problema}</p>
    <p>${element.status}</p>
    <p>${element.id_maquinas}</p>
    `;
    vaziaordem.appendChild(div);
  });
});

//Metodo GET para mostrar as ordens em manutenção
status_manutecao.addEventListener("click", async () => {
  vaziaordem.innerHTML = "";
  const resposta = await fetch(`${Api}/statusManutencao`);
  const listagem = await resposta.json();
  listagem.forEach((element) => {
    const div = document.createElement("div_ordem");
    div.innerHTML = `
    <h1>${element.nome_mecanico}</h1>
    <p>${element.data_abertura}</p>
    <p>${element.descricao_problema}</p>
    <p>${element.status}</p>
    <p>${element.id_maquinas}</p>
    `;
    vaziaordem.appendChild(div);
  });
});

//Metodo GET para mostrar as ordens concluidas
status_concluido.addEventListener("click", async () => {
  vaziaordem.innerHTML = "";
  const resposta = await fetch(`${Api}/statusConcluida`);
  const listagem = await resposta.json();
  listagem.forEach((element) => {
    const div = document.createElement("div_ordem");
    div.innerHTML = `
    <h1>${element.nome_mecanico}</h1>
    <p>${element.data_abertura}</p>
    <p>${element.descricao_problema}</p>
    <p>${element.status}</p>
    <p>${element.id_maquinas}</p>
    `;
    vaziaordem.appendChild(div);
  });
});
//Metodo GET para mostrar maquinas cadastradas
ul_lateral[2].addEventListener("click", async () => {
  status_triplo.style.display = "none";
  vaziaordem.innerHTML = "";
  const resposta = await fetch(`${Api}/maquinas`);
  const listagem = await resposta.json();
  listagem.forEach((element) => {
    const div = document.createElement("div_ordem");
    div.innerHTML = `
    <h1>${element.id_maquinas}</h1>
    <p>${element.modelo_maquina}</p>
    <p>${element.marca_maquina}</p>
    <p>${element.ano_maquina}</p>
    <p>${element.id_cliente}</p>
      <div id="botao">
    <button onclick='editar_maquina(${element.id_maquinas})'>✏️</button>
    <button onclick='deletar_maquina(${element.id_maquinas})'>🗑️</button>
    </div>   
    `;
    vaziaordem.appendChild(div);
  });
});
//voltar para o adm
ul_lateral[0].addEventListener("click", () => {
  status_triplo.style.display = "flex";
  vaziaordem.innerHTML = "";
});
//Metodo GET para mostrar usuario cadastradas
ul_lateral[3].addEventListener("click", async () => {
  status_triplo.style.display = "none";
  vaziaordem.innerHTML = "";
  const resposta = await fetch(`${Api}/usuarios`);
  const listagem = await resposta.json();
  listagem.forEach((element) => {
    const div = document.createElement("div_ordem");
    div.innerHTML = `
    <h1>${element.id_usuario}</h1>
    <p>${element.email_usuario}</p>

    <button onclick='deletar_funci(${element.id_usuario})'>🗑️</button>
    `;
    vaziaordem.appendChild(div);
  });
});
//Metodo GET para mostrar Ordens de serviço
ul_lateral[1].addEventListener("click", async () => {
  status_triplo.style.display = "none";
  vaziaordem.innerHTML = "";
  const resposta = await fetch(`${Api}/OS`);
  const listagem = await resposta.json();
  listagem.forEach((element) => {
    const div = document.createElement("div_ordem");
    div.innerHTML = `
    <h1>${element.nome_mecanico}</h1>
    <p>${element.data_abertura}</p>
    <p>${element.descricao_problema}</p>
    <p>${element.status}</p>
    <p>${element.id_maquinas}</p>
    `;
    vaziaordem.appendChild(div);
  });
});
//Metodo GET para mostrar historico
ul_lateral[4].addEventListener("click", async () => {
  status_triplo.style.display = "none";
  vaziaordem.innerHTML = "";
  const resposta = await fetch(`${Api}/historico`);
  const listagem = await resposta.json();
  listagem.forEach((element) => {
    const div = document.createElement("div_ordem");
    div.innerHTML = `
    <p>${element.id_ordem}</p>
    <p>${element.nome_mecanico}</p>
    <p>${element.data_abertura}</p>
    <p>${element.descricao_problema}</p>
    <p>${element.status}</p>
    <p>${element.id_maquinas}</p>
    `;
    vaziaordem.appendChild(div);
  });
});
//Metodo POST para cadastrar maquinas
cad_maquina.addEventListener("click", async () => {
  let modelo_maquina = document.querySelector("#modelo_maquina").value;
  let marca_maquina = document.querySelector("#marca_maquina").value;
  let ano_maquina = document.querySelector("#ano_maquina").value;
  if (modelo_maquina == "" || marca_maquina == "" || ano_maquina == "") {
    alert("Todos os campos devem ser preenchidos");
    return;
  }
  if (isNaN(ano_maquina)) {
    alert("Digite um número!");
    return;
  }
  if (ano_maquina > 2025 || ano_maquina<2000 ) {
    alert("Digite um número de ano válido!");
    return;
  }
  const resposta = await fetch(`${Api}/cadastrarMaquina`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      modelo_maquina,
      marca_maquina,
      ano_maquina,
    }),
  });
  if (resposta.status == 201) {
    alert("Máquina cadastrada");
    return window.location.reload();
  }
  return alert("Erro ao cadastrar a máquina");
});
//Método DELETE para excluir um usuario
async function deletar_funci(id) {
  const resposta = await fetch(`${Api}/deletar_usuario/${id}`, {
    method: "DELETE",
  });
  if (resposta.status == "200") {
    alert("Usuário excluido com sucesso");
    return window.location.reload();
  }
  return alert("Sem sucesso");
};
//Método DELETE para excluir uma maquina
async function deletar_maquina(id) {
  const resposta = await fetch(`${Api}/deletar_maquina/${id}`, {
    method: "DELETE",
  });
  if (resposta.status == "200") {
    alert("Máquina excluido com sucesso");
    return window.location.reload();
  }
  return alert("Sem sucesso");
}
//Método PUT para atualizar a maquina
async function editar_maquina(id) {
  const resposta = await fetch(`${Api}/maquina/${id}`);
  const objeto = await resposta.json();
  let modelo_maquina = prompt('Digite o novo modelo', objeto.modelo_maquina);
  let marca_maquina = prompt('Digite a nova marca', objeto.marca_maquina);
  let ano_maquina = prompt('Digite o novo ano', objeto.ano_maquina);
    if (!modelo_maquina || !marca_maquina || !ano_maquina) {
    alert("Todos os campos são obrigatórios!");
    return;
  }
  if (isNaN(ano_maquina)) {
    alert("Digite um número!");
    return;
  }
  if (ano_maquina < 2000 || ano_maquina > 2026) {
    alert("Digite um ano válido!");
    return;
  }
const update = await fetch(`${Api}/editar_maquina/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      modelo_maquina,
      marca_maquina,
      ano_maquina
    }),
  });
  if (update.status == 200) {
    alert("Usuário alterado");
    return window.location.reload();
  }
  return alert("erro ao alterar");
};
logout.addEventListener('click', ()=>{
  localStorage.clear();
  window.location.replace('../loginSignup/index.html');
});