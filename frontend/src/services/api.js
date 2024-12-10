const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/pagina-processa-dados-do-form', (req, res) => {
    const nome = req.body.usuario_nome;
    const email = req.body.usuario_email;
    const data = req.body.data_agendamento;
    const hora = req.body.hora_agendamento;
    const mensagem = req.body.usuario_msg;

    // Processar os dados recebidos
    console.log(`Nome: ${nome}, E-mail: ${email}, Data: ${data}, Hora: ${hora}, Mensagem: ${mensagem}`);
    res.send('Dados recebidos com sucesso!');
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});