import express from "express";
import LancamentoController from "../controller/lancamentoController.js";


const router = express.Router();

router
    .delete('/api/lancamentos', LancamentoController.deletar)
    .put('/api/lancamentos/:id', LancamentoController.atualizar)
    .post('/api/lancamentos', LancamentoController.cadastrar)
    .get('/api/lancamentos', LancamentoController.listar)
    .get('/api/lancamentos/:id', LancamentoController.listarPorId);

export default router;