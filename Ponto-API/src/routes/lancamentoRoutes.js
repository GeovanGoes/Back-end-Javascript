import express from "express";
import LancamentoController from "../controller/lancamentoController.js";


const router = express.Router();

router
    .delete('/lancamento/:id', LancamentoController.deletar)
    .put('/lancamento/:id', LancamentoController.atualizar)
    .post('/lancamento', LancamentoController.cadastrar)
    .get('/lancamento', LancamentoController.listar)
    .get('/lancamento/:id', LancamentoController.listarPorId);

export default router;