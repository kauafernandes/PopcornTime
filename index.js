const cors = require('cors');
const express = require('express');

const router = require('./routes/routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

//const porta = process.env.PORT || 3333;

const porta = 3333;

//define a porta do servidor - ou utiliza a oferecida pelo serviço de hospedagem
app.listen(porta, () => {
    console.log('Servidor iniciado na porta: ' + porta);
});

app.get('/', (request, response) => {
    response.send('Hello World');
});
