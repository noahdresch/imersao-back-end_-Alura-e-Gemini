import express from "express";
import routes from "./src/routes/postsRoutes.js";
// Importa o framework Express, que será utilizado para criar o servidor web. 
// O Express facilita a criação de APIs e aplicações web em Node.js.

const app = express();
// Cria uma instância do Express, que será o nosso servidor web. 
// Essa instância é como um contêiner que irá armazenar todas as rotas e funcionalidades da nossa aplicação.
routes(app)

app.listen(3000, () => {
    console.log("Servidor escutando...");
});
// Inicia o servidor na porta 3000. 
// Quando o servidor estiver pronto para receber requisições, a função de callback é executada, e uma mensagem é exibida no console informando que o servidor está ouvindo.
