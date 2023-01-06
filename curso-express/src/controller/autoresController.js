import autores from "../models/Autor.js"


class AutoresController {


    static listarAutores = (req, res) => {
        console.log('listando.');
        autores.find((err, autores)=> {
            res.status(200).json(autores);
        });
    }

    static cadastrarAutores = (req, res) => {
        console.log('cadastrando');
        let autor = new autores(req.body);
        autor.save((err) => {
            if (err) {
                res.status(500).send({message: `${err.message} - falha ao cadastrar o autor.`});
            } else {
                res.status(201).send(autor.toJSON());
            }
        })
    }

    static atualizarAutor = (req, res) => {
        console.log('atualizando');
        let {id} = req.params;
        
        autores.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if (!err)
                res.status(200).send('Atualizado com sucesso');
            else
                res.status(500).send(err.message);
        })
    }

    static listarAutorPorId = (req, res) => {
        console.log('buscando por id');
        let {id} = req.params;
        autores.findById(id, (err, autor) => {
            if (err)
                res.status(404).send(err.message);
            else
                res.status(200).json(autor);
        })
    }

    static deletarAutor = (req, res) => {
        console.log('deletando por id');
        let {id} = req.params;
        autores.findByIdAndDelete(id, (err) => {
            if (!err)
                res.status(200).send('deletado com sucesso');
            else
                res.status(500).send(err.message);
        })
    }
}


export default AutoresController;