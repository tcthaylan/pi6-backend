// Importa o Express e o Body Parser
const express = require('express');
const bodyParser = require('body-parser');

// Cria a aplicação usando o Express
const app = express();

// Ativa a utilização do Body Parser para o JSON e para as Urls
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Referencia o arquivo com as Rotas
require('./controllers/authController')(app); 
require('./controllers/restaurantController')(app); 
require('./controllers/projectController')(app); 

// Habilita a porta 3000 para ouvir a aplicação
app.listen(3000);