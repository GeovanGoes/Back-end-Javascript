import express from "express";
import UsuarioController from "../controller/usuarioController.js";


const router = express.Router();

router
    .post('/api/usuarios', UsuarioController.cadastrar)
    .get('/api/usuarios', UsuarioController.listar)
    .get('/api/usuarios/:email', UsuarioController.listarPorEmail);

export default router;