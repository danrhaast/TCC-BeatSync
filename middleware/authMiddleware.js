function checkAuth(req, res, next) {
    // Verifica se há um usuário autenticado na sessão
    if (!req.session.userId) {
        // Redireciona para a página de login caso não esteja autenticado
        return res.redirect('/login');
    }

    // Usuário autenticado, continua o fluxo
    next();
}

module.exports = checkAuth;
