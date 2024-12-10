const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');  // Para carregar variáveis de ambiente
dotenv.config();

const app = express();

// Middleware para interpretar dados JSON
app.use(bodyParser.json());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((err) => console.log('Erro ao conectar ao MongoDB:', err));

// Definir o modelo de dados para consultas
const Consulta = mongoose.model('Consulta', new mongoose.Schema({
  nome: String,
  email: String,
  telefone: String,
  modalidade: String,
  data: Date,
}));

// Rota para criar uma nova consulta
app.post('/marcar-consulta', async (req, res) => {
  try {
    const { nome, email, telefone, modalidade, data } = req.body;
    const novaConsulta = new Consulta({
      nome,
      email,
      telefone,
      modalidade,
      data
    });

    await novaConsulta.save();  // Salvar no banco de dados

    res.status(201).send('Consulta marcada com sucesso!');
  } catch (error) {
    res.status(500).send('Erro ao marcar consulta: ' + error.message);
  }
});

// Rota para pegar todas as consultas
app.get('/consultas', async (req, res) => {
  try {
    const consultas = await Consulta.find();  // Buscar todas as consultas
    res.json(consultas);
  } catch (error) {
    res.status(500).send('Erro ao buscar consultas: ' + error.message);
  }
});

// Configurar a porta do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
