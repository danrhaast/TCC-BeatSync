const User = require('../models/cadastroModel');

const cadastroController = {
    // Renderiza o formulário de cadastro
    renderCadastroForm: (req, res) => {
        res.render('cadastro', { error: null, data: {} }); // Define erro e dados iniciais como nulos/vazios
    },

    // Cadastra um novo usuário
    userCadastro: (req, res) => {
        const newUser = {
            nome: req.body.nome,
            email: req.body.email,
            peso: req.body.peso,
            altura: req.body.altura,
            data_nasc: req.body.dataNasc,
            genero: req.body.genero,
            senha: req.body.senha, // A senha será criptografada no cadastroModel
        };

        User.Cadastro(newUser, (err, userId) => {
            if (err) {
                if (err.message === 'E-mail já cadastrado.') {
                    return res.status(400).render('cadastro', {
                        error: 'E-mail já registrado. Tente outro.',
                        data: newUser, // Passa os dados preenchidos para não perder o que o usuário digitou
                    });
                }
                return res.status(500).render('cadastro', {
                    error: 'Erro ao cadastrar. Tente novamente mais tarde.',
                    data: newUser,
                });
            }

            // Redireciona para a página de login após o cadastro bem-sucedido
            res.redirect('/login');
        });
    },

    // Função para editar o perfil do usuário
    editar: (req, res) => {
        const userId = req.session.userId;
        const updatedUser = {
            nome: req.body.nome,
            email: req.body.email,
            data_nasc: req.body.data_nasc,
            peso: req.body.peso,
            altura: req.body.altura,
            genero: req.body.genero,
            senha: req.body.senha,
        };
    
        User.update(userId, updatedUser, (err) => { // Use o nome correto da função de model
            if (err) {
                console.error('Erro ao atualizar o perfil:', err);
                return res.status(500).send('Erro ao atualizar o perfil.');
            }
    
            // Atualiza os dados na sessão
            Object.assign(req.session, updatedUser);
    
            res.redirect('/users/perfil');
        });
    },
    

    deletar: (req, res) => {
        const userId = req.session.userId; // Recupera o ID do usuário da sessão
    
        if (!userId) {
            return res.status(401).send('Usuário não autenticado.');
        }
    
        User.delete(userId, (err) => {
            if (err) {
                console.error('Erro ao deletar perfil:', err);
                return res.status(500).send('Erro ao deletar perfil.');
            }
    
            // Remove a sessão após a exclusão do perfil
            req.session.destroy((err) => {
                if (err) {
                    console.error('Erro ao encerrar a sessão:', err);
                }
                res.redirect('/'); // Redireciona para a página inicial após a exclusão
            });
        });
    },
    
    
    // Renderiza a página de treino
    renderTreino: (req, res) => {
        res.render('users/treino', { title: 'Treino' });
    },

    // Renderiza a página de perfil do usuário
    renderPerfil: (req, res) => {
        res.render('users/perfil', {
            title: 'Perfil',
            userNome: req.session.userNome,
            userEmail: req.session.userEmail,
            userPeso: req.session.userPeso,
            userAltura: req.session.userAltura,
            userData_nasc: req.session.userData_nasc,
            userGenero: req.session.userGenero,
        });
    },

    // Renderiza o formulário de edição do perfil
    renderEditarPerfil: (req, res) => {
        res.render('editar', { // Corrigido o caminho ("/editar" para "editar")
            userNome: req.session.userNome,
            userEmail: req.session.userEmail,
            userData_nasc: req.session.userData_nasc,
            userPeso: req.session.userPeso,
            userAltura: req.session.userAltura,
            userGenero: req.session.userGenero,
            userSenha: req.session.userSenha
        });
    },

    // Renderiza a página de playlist
    renderPlaylist: (req, res) => {
        res.render('users/playlist', { title: 'Playlist' });
    },
};

module.exports = cadastroController;
