const express = require('express');
const cadastroController = require('../controllers/cadastroController');
const loginController = require('../controllers/loginController');
const checkAuth = require('../middleware/authMiddleware'); // Middleware de autenticação
const router = express.Router();

// Rotas protegidas
router.get('/treino', checkAuth, cadastroController.renderTreino);
router.get('/perfil', checkAuth, cadastroController.renderPerfil);
router.get('/playlist', checkAuth, cadastroController.renderPlaylist);

// Edição de perfil
router.get('/editar', checkAuth, cadastroController.renderEditarPerfil);
router.post('/editar', checkAuth, cadastroController.editar); // Alterado para PUT

// Exclusão de perfil
router.post('/deletar', checkAuth, cadastroController.deletar); // Alterado para DELETE

// Rotas públicas
router.post('/cadastro', cadastroController.userCadastro);
router.post('/login', loginController.userLogin);

module.exports = router;
