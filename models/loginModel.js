const db = require('../config/db');

const User = {
    login: (usuarios, callback) => {
        const query = 'SELECT id, nome, email, data_nasc, peso, altura, genero, senha FROM usuarios WHERE email = ?';

        db.query(query, [usuarios.email], (err, results) => {
            if (err) {
                console.error('Erro na consulta ao banco:', err);
                return callback(err, null); // Passa o erro para o callback
            }

            if (results.length === 0) {
                console.log('Usuário não encontrado.');
                return callback(null, null); // Retorna null se o email não for encontrado
            }

            const dbUser = results[0];
            console.log('Usuário encontrado no banco:', dbUser);

            // Garantir que as senhas sejam strings antes da comparação
            if (String(usuarios.senha) !== String(dbUser.senha)) {
                console.log('Senha incorreta.');
                return callback(null, null); // Retorna null se a senha for incorreta
            }

            // Se a senha estiver correta, chama o callback com o usuário
            callback(null, dbUser); // Sucesso
        });
    },
};

module.exports = User;
