import express from "express";
import UsuarioController from "../controller/usuarioController.js";


const router = express.Router();

router
    .post('/usuario', UsuarioController.cadastrar)
    .get('/usuario', UsuarioController.listar)
    .get('/usuario/:email', UsuarioController.listarPorEmail);

export default router;