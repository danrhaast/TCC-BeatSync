// logoutController.js

const logoutController = {
    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: 'Erro ao deslogar.' });
            }
            res.redirect('/login');  // Redireciona para a página de login
        });
    }
};

module.exports = logoutController;
