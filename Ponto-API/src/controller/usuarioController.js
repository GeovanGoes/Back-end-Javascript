import usuarios from "../models/Usuario.js"



class UsuarioController {


    static cadastrar = (req, res) => {
        let usuario = new usuarios(req.body);
        usuario.save((err) => {
            if (err)
                res.status(500).send({message:`Deu erro no cadastro do usuário.`})
            else
                res.status(201).send(usuario.toJSON());
        })
    }


    static listar = (req, res) => {
        let email = req.query.email;
        console.log(email);
        if (email) {
            usuarios.findOne({'email': email}, 'email nome ', function (err, usuario) {
                console.log(err);
                console.log(usuario);
                if (err) {
                    console.log(err);
                    res.status(500).send({message: `Deu erro no find by email`});
                } else
                    res.status(200).send(usuario.toJSON());
            })
        } else
            res.status(500).send({message: `Deu erro no find`});
    }
    
    static listarPorEmail = (req, res) => {
        let {email} = req.params;
        console.log(email);
        usuarios.findOne({'email': email}, 'email nome ', function (err, usuario) {
            console.log(err);
            console.log(usuario);
            if (err) {
                console.log(err);
                res.status(500).send({message: `Deu erro no find by email`});
            } else
                res.status(200).send(usuario.toJSON());
        })
    }

}

export default UsuarioController;