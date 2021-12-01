require('dotenv').config()
const express = require('express');
const mongoose  = require('mongoose');


const app = express();

// Froma de ler JSON e/ou middlewares
app.use(
    express.urlencoded({
        extended: false
    })
);

app.use(express.json());

// Rotas da API
const animalRoutes = require('./routes/animalRoutes')

app.use('/animal', animalRoutes)

// Endpoint
app.get('/', (req, res) => {

    res.json({
        message: 'ata'
    });

});

const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@api.0pteh.mongodb.net/apiExpress?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log('Conectamos ao banco de dados')
        // Porta
        app.listen(3000)
    })
    .catch((err) => console.log(err))

