const express = require('express');
const cadastroController = require('../controllers/cadastroController');
const loginController = require('../controllers/loginController');
const logoutController = require('../controllers/logoutController');
const checkAuth = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'BeatSync' });
});

router.get('/sobreNos', (req, res) => {
    res.render('sobreNos', { title: 'Sobre Nós' });
});

router.get('/musculacao', (req, res) => {
    res.render('musculacao', { title: 'Musculação' });
});

router.get('/funcional', (req, res) => {
    res.render('funcional', { title: 'Funcional' });
});

router.get('/cardio', (req, res) => {
    res.render('cardio', { title: 'Cardio' });
});

router.get('/cross', (req, res) => {
    res.render('cross', { title: 'CrossFit' });
});

router.get('/cadastro', cadastroController.renderCadastroForm);
router.get('/login', loginController.renderLoginForm);
router.post('/login', loginController.userLogin);
router.get('/logout', logoutController.logout);

module.exports = router;
