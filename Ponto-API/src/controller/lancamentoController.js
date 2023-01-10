import lancamentos from "../models/Lancamento.js"
import Dia from "../dto/dia.js";
import DateHelper from "../utils/DateHelper.js";

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
        let idUsuario = req.query.idUsuario;
        let data = req.query.dataHora;
        
        let {_id} = req.params;
        console.log(_id);
        lancamentos.deleteOne({"usuario": idUsuario, "dataHora": data}, (err) => {
            if (err)
                res.status(500).send({message: `Erro ao deletar o lancamento.`});
            else
                res.status(200).send({message: `Lancamento removido.`});
        })
    }

    static atualizar = (req, res) => {
        console.log(res.body);
        res.status(500).send({message: `not implemented`});
    }

    static listar = (req, res) => {

        let dateHelper = new DateHelper();

        console.log("Listando os lancamentos", req.query.idUsuario);
        let idUsuario = req.query.idUsuario;
        console.log(idUsuario);
        if (idUsuario) {
            lancamentos.find({'usuario': idUsuario}, 'dataHora usuario', function (err, lcs) {
                console.log(err);
                console.log(lcs);
    
                if (err)
                    res.status(500).send({message: `Erro ao buscar os lancamentos do usuario`})
                else {
                    let dias = [];
                    lcs.forEach(item => {
                        
                        let found = false;
                        dias.forEach(d => {
                            if (d.data == item.dataHora.toLocaleDateString("pt-BR")) {
                                d.data = item.dataHora.toLocaleDateString("pt-BR");
                                d.registros.push(dateHelper.formatarHorario(item.dataHora));
                                d.registros.sort();
                                d.lancamentos.push(item.dataHora);
                                d.lancamentos.sort();
                                found = true;
                            }
                        })

                        if (!found) {
                            let dia = new Dia();
                            dia.data = item.dataHora.toLocaleDateString("pt-BR");
                            dia.registros.push(dateHelper.formatarHorario(item.dataHora));
                            dia.registros.sort();
                            dia.lancamentos.push(item.dataHora);
                            dia.lancamentos.sort();
                            dias.push(dia);
                        }
                    })
                    dias.forEach(d => {
                        d.soma = dateHelper.obterPeriodoTrabalhado(d.lancamentos);
                        d.numeroDaSemana = dateHelper.obterNumeroDaSemana(d.lancamentos[0]);
                    });

                    dias.sort(function (a, b) {
                        const nameA = a.data;
                        const nameB = b.data;
                        if (nameA > nameB) {
                            return -1;
                        }
                        if (nameA < nameB) {
                            return 1;
                        }
                        return 0;
                    })
                    res.status(200).json(dias);
                }
            });
        } else {
            res.status(500).send({message: `Erro ao listar os lancamentos.`});
        }
    }

    tratarResponseSucesso (res, listaDeLancamentos) {
        let dias = [];
        listaDeLancamentos.forEach(item => {
            let dia = dias.filter(d => d.data == item.dataHora.toLocaleDateString("pt-BR"));
            if (!dia) {
                dia = new Dia();
            }
            dia.data = item.dataHora.toLocaleDateString("pt-BR");
            dia.registros.push(item.dataHora.toLocaleTimeString("pt-BR"));
            dia.lancamento.push(item.dataHora);
        })


        res.status(200).json(dias);
    }

    static listarPorId = (req, res) => {

        console.log(res.body);
    }
}

export default LancamentoController;