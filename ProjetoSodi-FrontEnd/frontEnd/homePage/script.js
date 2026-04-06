//captura de elementos
const buttonNo = document.querySelector("#buttonNo");
const buttonS = document.querySelector("#buttonS");
const buttonC = document.querySelector("#buttonC");
const formulario = document.querySelector("#formulario");
const divTform = document.querySelector("#divTform");
const servicos = document.querySelector("#servicos");
const idMaq = document.querySelector("#idMaq");
const modeloMaq = document.querySelector("#modeloMaq");
const marcaMaq = document.querySelector("#marcaMaq");
const anoMaq = document.querySelector("#anoMaq");
const descMaq = document.querySelector("#descMaq");
const mecanicoMaq = document.querySelector("#mecanicoMaq");
const dataMaq = document.querySelector("#dataMaq");
const status = document.querySelector("#statusMaq");
const logout = document.querySelector("#logout");
const user = localStorage.getItem("id");
const Api = "http://192.168.1.5:3000"

console.log(user);

//habilitar formulário OS
buttonNo.addEventListener("click", () => {
  buttonNo.style.display = "none";
  buttonS.style.display = "flex";
  buttonC.style.display = "flex";
  formulario.style.display = "flex";
  divTform.style.display = "flex";
});

//desabilitar formulário OS
buttonC.addEventListener("click", () => {
  formulario.style.display = "none";
  divTform.style.display = "none";
  buttonC.style.display = "none";
  buttonS.style.display = "none";
  buttonNo.style.display = "flex";
});

//ordens de serviço
window.addEventListener("DOMContentLoaded", async () => {
  if (user == null) {
    return window.location.replace("../loginSignup/index.html");
  }
  const resposta = await fetch(`${Api}/OS`);
  const ordens = await resposta.json();
  const resposta1 = await fetch(`${Api}/maquinas`);
  const maquina = await resposta1.json();

  ordens.forEach((ordem) => {
    const divTC = document.createElement("div");
    divTC.classList = "divTC";

    const divTitle = document.createElement("div");
    divTitle.classList = "divTitle";

    const cardDiv = document.createElement("div");
    cardDiv.classList = "cardDiv";
    cardDiv.onclick = () => {
      document.querySelector("#modalOS").showModal();
    };

    //////////////////////////////////////////////

    const id_ordem = document.createElement("h1");
    id_ordem.textContent = `Ordem: ${ordem.id_ordem}`;
    divTitle.appendChild(id_ordem);

    const id_maquinas = document.createElement("h2");
    id_maquinas.textContent = `Número serial da máquina: ${ordem.id_maquinas}`;
    cardDiv.appendChild(id_maquinas);

    const nome_mecanico = document.createElement("h3");
    nome_mecanico.textContent = `Mecânico responsável: ${ordem.nome_mecanico}`;
    cardDiv.appendChild(nome_mecanico);

    const descricao_problema = document.createElement("h3");
    descricao_problema.textContent = `Descricão: ${ordem.descricao_problema}`;
    cardDiv.appendChild(descricao_problema);

    const status = document.createElement("h2");
    status.textContent = `Status da ordem: ${ordem.status}`;
    cardDiv.appendChild(status);

    const data_abertura = document.createElement("h3");
    data_abertura.textContent = `Data de registro: ${ordem.data_abertura.slice(0, 10)}`;
    cardDiv.appendChild(data_abertura);

    //////////////////////////////////////////////

    divTC.appendChild(divTitle);
    divTC.appendChild(cardDiv);
    servicos.appendChild(divTC);

    //////////////////////////////////////////////
  });
});

document.querySelector("#Fechar").addEventListener("click", () => {
  document.querySelector("#modalOS").close();
});

logout.addEventListener("click", () => {
  localStorage.clear();
  window.location.reload();
});

async function criarOrdem() {
  const nome_mecanico = mecanicoMaq.value;
  const data_abertura = dataMaq.value;
  const descricao_problema = descMaq.value;
  const status = statusMaq.value;
  const id_maquinas = idMaq.value;

  //validação de informações
  /////////////////////////

  console.log(
    nome_mecanico,
    data_abertura,
    descricao_problema,
    status,
    id_maquinas,
  );

  const resposta = await fetch(`${Api}/cadastrarOS`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      nome_mecanico,
      data_abertura,
      descricao_problema,
      status,
      id_maquinas,
    }),
  });

  if (resposta.status == 201) {
    alert("Produto cadastrado!");
  }
}

buttonS.addEventListener("click", () => {
  criarOrdem();
  window.location.reload();
});

logout.addEventListener('click', ()=>{
  localStorage.clear();
  window.location.replace('../loginSignup/index.html');
});