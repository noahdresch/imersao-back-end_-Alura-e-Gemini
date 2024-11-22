import getTodosPosts from "../models/postsModel.js";

export async function listarPosts(req, res) {
    // Define uma rota para lidar com requisições GET para a URL "/posts".
    // Quando uma requisição GET é feita para essa URL, o código dentro dessa função é executado.
    const posts = await getTodosPosts();
    // Chama a função `getTodosPosts()` para obter todos os posts e armazena o resultado na variável `posts`.
    res.status(200).json(posts);
    // Envia uma resposta HTTP com status 200 (OK) e os dados dos posts no formato JSON. 
    // O método `json()` converte o objeto JavaScript `posts` em uma string JSON e a envia no corpo da resposta.
} 

