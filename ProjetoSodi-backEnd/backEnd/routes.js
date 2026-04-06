import express from "express";
import sql from "./database.js";
import { CompararHash, CriarHash } from "./utils.js";
const routes = express.Router();

//Visualizar ordens de serviço
routes.get("/OS", async (req, res) => {
  try {
    const os = await sql`SELECT * FROM ordensServico`;
    if (os) {
      return res.status(200).json(os);
    }
  } catch (error) {
    console.log("Mensagem de erro: " + error);
    return res.status(400);
  }
});

//Maquinas cadastradas
routes.get("/maquinas", async (req, res) => {
  try {
    const maquinas = await sql`SELECT * FROM maquinas`;
    if (maquinas) {
      return res.status(200).json(maquinas);
    }
  } catch (error) {
    console.log("Mensagem de erro: " + error);
    return res.status(400);
  }
});

//Maquinas cadastradas
routes.get("/maquina/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const maquinas =
      await sql`SELECT * FROM maquinas where id_maquinas = ${id}`;
    if (maquinas) {
      return res.status(200).json(maquinas[0]);
    }
  } catch (error) {
    console.log("Mensagem de erro: " + error);
    return res.status(400);
  }
});

//Cadastrar nova ordem de servico
routes.post("/cadastrarOS", async (req, res) => {
  const {
    nome_mecanico,
    data_abertura,
    descricao_problema,
    status,
    id_maquinas,
  } = req.body;

  await sql`INSERT INTO ordensServico(nome_mecanico, data_abertura, descricao_problema, status, id_maquinas) 
  values(
  ${nome_mecanico},
  ${data_abertura},
  ${descricao_problema},
  ${status},
  ${id_maquinas}
  )`;

  return res.status(201).json("Produto criado!");
});

//Cadastrar novo usuario
routes.post("/cadastroUser", async (req, res) => {
  try {
    const { email_usuario, senha_usuario } = req.body;
    const hash = await CriarHash(senha_usuario, 10);
    const consulta =
      await sql`select * from usuario where email_usuario=${email_usuario}`;
    if (consulta.length != 0) {
      return res.status(409).json("Usuário já cadastrado");
    } else {
      await sql`INSERT INTO usuario(email_usuario, senha_usuario) VALUES (${email_usuario}, ${hash})`;
      return res.status(200).json("Usuário cadastrado!");
    }
  } catch (error) {
    console.log(`Mensagem de erro: ` + error);
    return res.status(400);
  }
});

//Login de usuario
routes.post("/loginUsuario", async (req, res) => {
  try {
    const { email_usuario, senha_usuario } = req.body;

    const usuario =
      await sql`SELECT * FROM usuario WHERE email_usuario = ${email_usuario}`;
    if (usuario[0]) {
      return res.status(200).json(usuario[0]);
    }
    const teste = await CompararHash(senha_usuario, usuario[0].senha_usuario);
    if (teste) {
      return res.status(200).json("Logado!");
    } else {
      return res.status(401).json("Usuario ou senha incorreta");
    }
  } catch (error) {
    console.log(`Mensagem de erro: ` + error);
    return res.status(400);
  }
});

//Usuarios cadastrados
routes.get("/usuarios", async (req, res) => {
  try {
    const usuario = await sql`SELECT * FROM usuario`;
    if (usuario) {
      return res.status(200).json(usuario);
    }
  } catch (error) {
    console.log("Mensagem de erro: " + error);
    return res.status(400);
  }
});

//Cadastrar nova maquina
routes.post("/cadastrarMaquina", async (req, res) => {
  const { modelo_maquina, marca_maquina, ano_maquina } = req.body;

  await sql`INSERT INTO maquinas(modelo_maquina, marca_maquina, ano_maquina, id_cliente) 
  values(
  ${modelo_maquina},
  ${marca_maquina},
  ${ano_maquina},
  1
  )`;
  return res.status(201).json("Produto criado!");
});

//Visualizar historico
routes.get("/historico", async (req, res) => {
  try {
    const os = await sql`SELECT * FROM ordensServico`;
    if (os) {
      return res.status(200).json(os);
    }
  } catch (error) {
    console.log("Mensagem de erro: " + error);
    return res.status(400);
  }
});

//Deletar usuario
routes.delete("/deletar_usuario/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Entrou na rota");
    await sql`DELETE FROM usuario WHERE id_usuario = ${id}`;
    return res.status(200).json({ message: "Produto deletado" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao deletar produto" });
  }
});

//Atulaizar maquina
routes.put("/editar_maquina/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { modelo_maquina, marca_maquina, ano_maquina } = req.body;
    await sql`UPDATE maquinas
	SET modelo_maquina=${modelo_maquina}, marca_maquina=${marca_maquina}, ano_maquina=${ano_maquina} where id_maquinas = ${id}`;
    return res.status(200).json({ message: "Máquina atualizado" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao deletar máquina" });
  }
});

//Deletar usuario
routes.delete("/deletar_maquina/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Entrou na rota");
    await sql`DELETE FROM maquinas WHERE id_maquinas = ${id}`;
    return res.status(200).json({ message: "maquina deletado" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao deletar maquina" });
  }
});

//Visualizar ordens de serviço ABERTA
routes.get("/statusAberta", async (req, res) => {
  try {
    const aberta =
      await sql`SELECT * FROM ordensServico WHERE status = 'Aberta'`;
    if (aberta) {
      return res.status(200).json(aberta);
    }
  } catch (error) {
    console.log("Mensagem de erro: " + error);
    return res.status(400);
  }
});

//Visualizar ordens de serviço MANUTENÇÃO
routes.get("/statusManutencao", async (req, res) => {
  try {
    const manutencao =
      await sql`SELECT * FROM ordensServico WHERE status = 'Manutenção'`;
    if (manutencao) {
      return res.status(200).json(manutencao);
    }
  } catch (error) {
    console.log("Mensagem de erro: " + error);
    return res.status(400);
  }
});

//Visualizar ordens de serviço CONCLUIDA
routes.get("/statusConcluida", async (req, res) => {
  try {
    const concluida =
      await sql`SELECT * FROM ordensServico WHERE status = 'Concluida'`;
    if (concluida) {
      return res.status(200).json(concluida);
    }
  } catch (error) {
    console.log("Mensagem de erro: " + error);
    return res.status(400);
  }
});

export default routes;
