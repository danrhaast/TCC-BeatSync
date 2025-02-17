const db = require('../config/db');

const User = {
    Cadastro: (usuarios, callback) => {
        console.log('cadastrando úsuario:'+ usuarios.email)
        const checkEmailQuery = 'SELECT email FROM usuarios WHERE email = ?';
        db.query(checkEmailQuery, [usuarios.email], (err, results) => {
            if (err) {
                return callback(err);
            }
            if (results.length > 0) {
                return callback(new Error('E-mail já cadastrado.'));
            }
            const query = 'INSERT INTO usuarios (nome, email, data_nasc, genero, peso, altura, senha) VALUES (?,?,?,?,?,?,?)'
            db.query(query, [usuarios.nome, usuarios.email, usuarios.data_nasc, usuarios.genero, usuarios.peso, usuarios.altura, usuarios.senha], (err, results) => {
                if (err) {
                    return callback(err);
                } if (results.length === 0) {
                    return callback(null, false)
                }
                callback(null, results[0]);
            })
        });
    },

    perfil: (usuarios, callback) => {
        const query = 'SELECT * FROM usuarios WHERE nome = ? AND email = ? AND data_nasc = ? AND peso = ? AND altura = ? AND genero = ?';
        db.query(query, [usuarios.nome, usuarios.email, usuarios.data_nasc, usuarios.peso, usuarios.altura, usuarios.genero], (err, results) => {
            if (err) {
                return callback(err);
            }
            if (results.length === 0) {
                return callback(null, false);
            }
            callback(null, results[0]);
        });
    },

    update: (id, updatedUser, callback) => {
        const query = 'UPDATE usuarios SET nome = ?, email = ?, data_nasc = ?, peso = ?, altura = ?, genero = ?, senha = ? WHERE id = ?';
        const params = [updatedUser.nome, updatedUser.email, updatedUser.data_nasc, updatedUser.peso, updatedUser.altura, updatedUser.genero, updatedUser.senha, id];
    
        db.query(query, params, (err, result) => {
            if (err) {
                console.error('Erro ao atualizar o usuário no banco:', err);
                return callback(err);
            }
    
            callback(null);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM usuarios WHERE id = ?';
    
        db.query(query, [id], (err, result) => {
            if (err) {
                console.error('Erro ao excluir o usuário do banco:', err);
                return callback(err);
            }
    
            callback(null);
        });
    },
    
    
};

module.exports = User;