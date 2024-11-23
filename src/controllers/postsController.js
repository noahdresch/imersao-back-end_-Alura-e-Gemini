import { getTodosPosts, criarPost, atualizarPost } from "../models/postsModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js"

export async function listarPosts(req, res) {
    // Define uma rota para lidar com requisições GET para a URL "/posts".
    // Quando uma requisição GET é feita para essa URL, o código dentro dessa função é executado.
    const posts = await getTodosPosts();
    // Chama a função `getTodosPosts()` para obter todos os posts e armazena o resultado na variável `posts`.
    res.status(200).json(posts);
    // Envia uma resposta HTTP com status 200 (OK) e os dados dos posts no formato JSON. 
    // O método `json()` converte o objeto JavaScript `posts` em uma string JSON e a envia no corpo da resposta.
} 

export async function postarNovoPost(req, res) {
    const novoPost = req.body;
    try {
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}

export async function uploadImagem(req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    try {
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada)
        res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}

export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`
    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
        const descricao = await gerarDescricaoComGemini(imgBuffer)

        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }
        
        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}
