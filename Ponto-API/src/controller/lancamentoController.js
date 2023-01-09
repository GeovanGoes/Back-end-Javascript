import lancamentos from "../models/Lancamento.js"
import Dia from "../dto/dia.js";

class LancamentoController {

    diferencaEtreDatas(d1, d2) {
        const diffInMs   = d2 - d1;
        const diffInHours = diffInMs / (1000 * 60 * 60);
        return diffInHours;
    }

    static cadastrar = (req, res) => {
        console.log(req.body);
        let lancamento = new lancamentos(req.body);
        console.log(lancamento);

        lancamentos.findOne({'dataHora': lancamento.dataHora, 'usuario': lancamento.usuario._id}, 'dataHora', function (errf, lc) {
            console.log(errf);
            console.log(lc);
            if (lc) {
                res.status(500).send({message: `Lancamento repetido.`});
            } else {
                lancamento.save((err) => {
                    console.log(err);
                    console.log(lancamento);
                    if (err)
                        res.status(500).send({message: `Erro ao salvar o lancamento.`});
                    else
                        res.status(201).send(lancamento.toJSON());
                })        
            }
        });


    }

    static deletar = (req, res) => {

        console.log(res.body);
    }

    static atualizar = (req, res) => {

        console.log(res.body);
    }

    static listar = (req, res) => {
        console.log("Listando os lancamentos", req.query.idUsuario);
        let idUsuario = req.query.idUsuario;

        let dias = [];

        let listaDeLancamentos = []; 

        if (idUsuario) {
            lancamentos.find({'usuario': idUsuario}, 'dataHora usuario', function (err, lcs) {
                console.log(err);
                console.log(lcs);
    
                if (err)
                    res.status(500).send({message: `Erro ao buscar os lancamentos do usuario`})
                else
                    listaDeLancamentos = lcs;
            });
        } else {
            lancamentos.find((err, lcs) => {
                listaDeLancamentos = lcs;
            });
        }

        listaDeLancamentos.forEach(item => {
            dias.filter(d => d.)
        })

        res.status(200).json(listaDeLancamentos);
    }

    static listarPorId = (req, res) => {

        console.log(res.body);
    }
}

export default LancamentoController;