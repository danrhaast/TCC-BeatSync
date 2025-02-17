const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const userRoutes = require('./routes/userRoutes');
const indexRoutes = require('./routes/indexRoutes');
const playRoutes = require('./routes/playRoutes');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Definir a view engine como EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);

// Arquivos estáticos
app.use(express.static('public'));

// Middleware de bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Configuração da sessão
app.use(session({
  secret: 'kdfjssahfidghfdi213judsak', 
  resave: false,
  saveUninitialized: true
}));

// Middleware de flash
app.use(flash());

// Middleware global para passar as mensagens de flash para as views
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Definindo as rotas
app.use('/users', userRoutes);
app.use('/', indexRoutes);
app.use('/', playRoutes);

// Função para renderizar todas as views dinamicamente (caso precise)
const renderAllViews = (dirPath, baseRoute = '') => {
  fs.readdirSync(dirPath).forEach(file => {
    const fullPath = path.join(dirPath, file);
    const route = path.join(baseRoute, file.replace('.ejs', ''));

    if (fs.statSync(fullPath).isDirectory()) {
      renderAllViews(fullPath, route);
    } else if (file.endsWith('.ejs')) {
      app.get(route === '/index' ? '/' : route, (req, res) => {
        res.render(path.join(baseRoute, file.replace('.ejs', '')));
      });
    }
  });
};

// Renderizando todas as views (se necessário)
renderAllViews(path.join(__dirname, 'views'));

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
