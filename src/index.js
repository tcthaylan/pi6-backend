// Importa o Express e o Body Parser
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path')
require('dotenv').config()
// Cria a aplicação usando o Express
const app = express();

app.use(cors());
// Ativa a utilização do Body Parser para o JSON e para as Urls
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/files', 
  express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')
))

// Referencia o arquivo com as Rotas
require('./controllers/authController')(app); 
require('./controllers/restaurantController')(app); 
require('./controllers/clientController')(app); 
require('./controllers/userController')(app); 
require('./controllers/foodController')(app); 

// Habilita a porta 3000 para ouvir a aplicação
app.listen(process.env.PORT || 3000);