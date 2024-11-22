import conectarAoBanco from "../config/dbConfig.js"

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);
// Cria uma conexão com o banco de dados MongoDB. A string de conexão é obtida da variável de ambiente `process.env.STRING_CONEXAO`.
// A palavra-chave `await` indica que essa operação é assíncrona e espera que a conexão seja estabelecida antes de continuar.

export default async function getTodosPosts() {
    // Função assíncrona para buscar todos os posts do banco de dados.
    // A palavra-chave `async` indica que essa função pode realizar operações assíncronas.
    const db = conexao.db("imersao-instabytes");
    // Seleciona o banco de dados chamado "imersao-instabytes" dentro da conexão estabelecida.
    const colecao = db.collection("posts");
    // Seleciona a coleção (tabela) chamada "posts" dentro do banco de dados.
    return colecao.find().toArray();
    // Executa uma consulta para encontrar todos os documentos (posts) na coleção e retorna os resultados como um array.
}