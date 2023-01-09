import livros from "../models/Livro.js"


class LivroController {


    static listarLivros = (req, res) => {
        console.log('listando.');
        livros
        .find()
        .populate('autor')
        .exec((err, livros) => {
            res.status(200).json(livros);
        });
    }

    static cadastrarLivro = (req, res) => {
        console.log('cadastrando');
        let livro = new livros(req.body);
        livro.save((err) => {
            if (err) {
                res.status(500).send({message: `${err.message} - falha ao cadastrar o livro.`});
            } else {
                res.status(201).send(livro.toJSON());
            }
        })
    }

    static atualizarLivro = (req, res) => {
        console.log('atualizando');
        let {id} = req.params;
        
        livros.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if (!err)
                res.status(200).send('Atualizado com sucesso');
            else
                res.status(500).send(err.message);
        })
    }

    static listarLivroPorId = (req, res) => {
        console.log('buscando por id');
        let {id} = req.params;
        livros
        .findById(id)
        .populate('autor', 'nome')
        .exec((err, livro) => {
            if (err)
                res.status(404).send(err.message);
            else
                res.status(200).json(livro);
        })
    }

    static deletarLivro = (req, res) => {
        console.log('deletando por id');
        let {id} = req.params;
        livros.findByIdAndDelete(id, (err) => {
            if (!err)
                res.status(200).send('deletado com sucesso');
            else
                res.status(500).send(err.message);
        })
    }


    static listarPorEditora = (req, res) => {
        console.log('buscando por editora');
        const editora = req.query.editora;
        livros.find({'editora': editora}, {}, (err, livro) => {
            if (err)
                res.status(404).send(err.message);
            else
                res.status(200).json(livro);
        })
    }

}

export default LivroController;