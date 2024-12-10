const mongoose = require('mongoose');

const ConsultaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  telefone: { type: String, required: true },
  modalidade: { type: String, required: true },
  data: { type: Date, required: true },
});

module.exports = mongoose.model('Consulta', ConsultaSchema);
