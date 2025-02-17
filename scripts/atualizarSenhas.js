const bcrypt = require('bcrypt');
const db = require('../config/db'); // Certifique-se de que o caminho esteja correto

const atualizarSenhas = async () => {
    try {
        const [usuarios] = await db.query('SELECT id, senha FROM usuarios');
        
        for (const usuario of usuarios) {
            if (!bcrypt.getRounds(usuario.senha)) { // Verifica se a senha já está criptografada
                const hashedPassword = await bcrypt.hash(String(usuario.senha), 10);
                await db.query('UPDATE usuarios SET senha = ? WHERE id = ?', [hashedPassword, usuario.id]);
            }
        }

        console.log('Senhas atualizadas com sucesso.');
    } catch (error) {
        console.error('Erro ao atualizar senhas:', error);
    } finally {
        db.end(); // Encerra a conexão com o banco de dados
    }
};

atualizarSenhas();
