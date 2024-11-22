import express from "express"
import { listarPosts } from "../controllers/postsController.js";

const routes = (app) => {
    app.use(express.json());
    // Habilita o middleware `express.json()`. Esse middleware permite que o Express entenda requisições com corpo no formato JSON. 
    // Isso é fundamental para receber dados enviados em formato JSON, como em requisições POST ou PUT.

    app.get("/posts", listarPosts);
}

export default routes;
