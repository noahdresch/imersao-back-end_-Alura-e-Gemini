import express from "express";
// Importa o framework Express, que será utilizado para criar o servidor web e lidar com as rotas.

import multer from "multer";
// Importa o módulo Multer, que será utilizado para lidar com o upload de arquivos (imagens no nosso caso).

import { listarPosts, postarNovoPost, uploadImagem } from "../controllers/postsController.js";
// Importa as funções para listar posts, criar novos posts e fazer o upload de imagens, que estão definidas no arquivo `postsController.js`.

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    // Define onde os arquivos serão salvos. No caso, serão salvos na pasta 'uploads'.
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
    // Define o nome do arquivo salvo. Será o mesmo nome original do arquivo enviado pelo usuário.
});

const upload = multer({ dest: "./uploads", storage });
// linux ou no mac, posso usar apenas esta linha de cima - const upload = multer({ dest: "./uploads", storage})
// Configura o Multer para salvar os arquivos na pasta 'uploads' e utiliza a configuração de armazenamento definida anteriormente.
// **Observação:** Em sistemas Linux ou macOS, a configuração `dest: "./uploads"` pode ser suficiente.

const routes = (app) => {
    app.use(express.json());
    // Habilita o middleware `express.json()`. Esse middleware permite que o Express entenda requisições com corpo no formato JSON. 
    // Isso é fundamental para receber dados enviados em formato JSON, como em requisições POST ou PUT.

    app.get("/posts", listarPosts);
    // Define uma rota GET para a URL "/posts". 
    // Quando uma requisição GET for feita para essa URL, a função `listarPosts` será chamada para buscar todos os posts do banco de dados e enviar a resposta.

    app.post("/posts", postarNovoPost);
    // Define uma rota POST para a URL "/posts". 
    // Quando uma requisição POST for feita para essa URL, a função `postarNovoPost` será chamada para criar um novo post no banco de dados.

    app.post("/upload", upload.single("imagem"), uploadImagem);
    // Define uma rota POST para a URL "/upload". 
    // O middleware `upload.single("imagem")` configura o Multer para lidar com o upload de um único arquivo com o nome "imagem". 
    // Quando uma requisição POST for feita para essa URL, o arquivo será salvo na pasta configurada e a função `uploadImagem` será chamada para processar o arquivo.
};

export default routes;
// Exporta a função `routes` para que possa ser utilizada em outros módulos.
