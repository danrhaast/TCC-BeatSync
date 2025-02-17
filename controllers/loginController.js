const User = require('../models/loginModel');

const loginController = {
    userLogin: (req, res) => {
        const { email, senha } = req.body;

        console.log(`Tentativa de login com email: ${email}`); 

        User.login({ email, senha }, (err, usuario) => {
            if (err) {
                console.error('Erro na consulta ao banco de dados:', err);
                req.flash('error_msg', 'Erro no servidor.');
                return res.redirect('/login');
            }

            if (!usuario) {
                console.log('Usuário não encontrado ou senha incorreta.');
                req.flash('error_msg', 'Credenciais inválidas.');
                return res.redirect('/login');
            }

            console.log(`Usuário autenticado com sucesso: ID = ${usuario.id}, Email = ${usuario.email}`);
            req.session.user = usuario;
            req.session.userId = usuario.id;
            req.session.userEmail = usuario.email;
            req.session.userNome = usuario.nome;
            req.session.userData_nasc = usuario.data_nasc;
            req.session.userGenero = usuario.genero;
            req.session.userPeso = usuario.peso;
            req.session.userAltura = usuario.altura;


            req.flash('success_msg', 'Login realizado com sucesso!');
            res.redirect('/');
        });
    },

    renderLoginForm: (req, res) => {
        res.render('login');
    },
};

module.exports = loginController;
