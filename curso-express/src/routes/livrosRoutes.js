import express from "express";
import LivroController from "../controller/livrosController.js";


const router = express.Router();

router
.get('/livros', LivroController.listarLivros)
.get('/livros/busca', LivroController.listarPorEditora)
.get('/livros/:id', LivroController.listarLivroPorId)
.post('/livros', LivroController.cadastrarLivro)
.put('/livros/:id', LivroController.atualizarLivro)
.delete('/livros/:id', LivroController.deletarLivro)

export default router;