const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer'); // Importando Nodemailer
const dotenv = require('dotenv'); // Para variáveis de ambiente
dotenv.config();



const app = express();

// Middleware para interpretar JSON
app.use(bodyParser.json());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));


// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // Serviço de e-mail (substitua conforme necessário)
  auth: {
    user: process.env.EMAIL_USER, // Seu e-mail
    pass: process.env.EMAIL_PASS, // Sua senha de app
  },
});

// Modelos do MongoDB
const Consulta = mongoose.model('Consulta', new mongoose.Schema({
  nome: String,
  email: String,
  telefone: String,
  modalidade: String,
  data: Date,
}));

const Anamnese = mongoose.model('Anamnese', new mongoose.Schema({
  nome: String,
  email: String,
  telefone: String,
  motivo: String,
  data: Date,
}));

// Rota para agendar consulta
app.post('/marcar-consulta', async (req, res) => {
  try {
    const { nome, email, telefone, modalidade, data } = req.body;

    // Salvar no banco de dados
    const novaConsulta = new Consulta({ nome, email, telefone, modalidade, data });
    await novaConsulta.save();

    // Enviar notificação por e-mail
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Remetente
      to: process.env.NOTIFICATION_EMAIL, // Destinatário (fisioterapeuta)
      subject: 'Nova Consulta Agendada',
      text: `Uma nova consulta foi agendada:\n\nNome: ${nome}\nEmail: ${email}\nTelefone: ${telefone}\nModalidade: ${modalidade}\nData: ${data}`,
    });

    res.status(201).send('Consulta marcada com sucesso!');
  } catch (error) {
    console.error('Erro ao agendar consulta:', error);
    res.status(500).send('Erro ao marcar consulta.');
  }
});

// Rota para marcar anamnese
app.post('/marcar-anamnese', async (req, res) => {
  try {
    const { nome, email, telefone, motivo, data } = req.body;

    // Salvar no banco de dados
    const novaAnamnese = new Anamnese({ nome, email, telefone, motivo, data });
    await novaAnamnese.save();

    // Enviar notificação por e-mail
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Remetente
      to: process.env.NOTIFICATION_EMAIL, // Destinatário (fisioterapeuta)
      subject: 'Nova Anamnese Agendada',
      text: `Uma nova anamnese foi agendada:\n\nNome: ${nome}\nEmail: ${email}\nTelefone: ${telefone}\nMotivo: ${motivo}\nData: ${data}`,
    });

    res.status(201).send('Anamnese marcada com sucesso!');
  } catch (error) {
    console.error('Erro ao marcar anamnese:', error);
    res.status(500).send('Erro ao marcar anamnese.');
  }
});

// Porta do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));

console.log(process.env.MONGO_URI);

