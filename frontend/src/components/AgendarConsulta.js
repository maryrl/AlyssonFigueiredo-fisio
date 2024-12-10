import React, { useState } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';

const AgendarConsulta = () => {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        modalidade: '',
        data: new Date(),
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, data: date });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/agendar', formData)
            .then(() => alert('Consulta agendada com sucesso!'))
            .catch(() => alert('Erro ao agendar consulta'));
    };

    return (
        <div>
            <h2>Agendar Consulta</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="nome" placeholder="Nome" onChange={handleInputChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleInputChange} required />
                <input type="text" name="telefone" placeholder="Telefone" onChange={handleInputChange} required />
                <select name="modalidade" onChange={handleInputChange} required>
                    <option value="">Selecione a Modalidade</option>
                    <option value="Fisioterapia Ortopédica">Fisioterapia Ortopédica</option>
                    <option value="Pilates">Pilates</option>
                    <option value="Terapia Manual">Terapia Manual</option>
                    <option value="Reabilitação Neurológica">Reabilitação Neurológica</option>
                    <option value="Drenagem Linfática">Drenagem Linfática</option>
                </select>
                <Calendar onChange={handleDateChange} value={formData.data} />
                <button type="submit">Agendar</button>
            </form>
        </div>
    );
};

export default AgendarConsulta;
