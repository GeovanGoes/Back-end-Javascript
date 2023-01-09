import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import cors from 'cors';


db.on("error", console.log.bind(console, 'Erro de conexão'));

db.once("open", () => {
    console.log("Conexao com o mongo OK.");
})

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*'
}));
routes(app);

export default app