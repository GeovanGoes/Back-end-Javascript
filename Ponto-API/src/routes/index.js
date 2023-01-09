import express from "express";
import autores from "./autoresRoutes.js";
import livros from "./livrosRoutes.js";
import lancamentos from "./lancamentoRoutes.js";
import usuarios from "./usuarioRoutes.js";

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send('Curso de Node.');
    })

    app.use(
        express.json(),
        livros,
        autores,
        lancamentos,
        usuarios,
    )
}

export default routes;