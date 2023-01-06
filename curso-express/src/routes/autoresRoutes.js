import express from "express";
import AutoresController from "../controller/autoresController.js";


const router = express.Router();

router
    .delete('/autores/:id', AutoresController.deletarAutor)
    .put('/autores/:id', AutoresController.atualizarAutor)
    .post('/autores', AutoresController.cadastrarAutores)
    .get('/autores', AutoresController.listarAutores)
    .get('/autores/:id', AutoresController.listarAutorPorId);

export default router;