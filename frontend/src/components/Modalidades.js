import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Modalidades = () => {
    const [modalidades, setModalidades] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/modalidades')
            .then((response) => setModalidades(response.data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            <h2>Modalidades</h2>
            <ul>
                {modalidades.map((modalidade, index) => (
                    <li key={index}>{modalidade}</li>
                ))}
            </ul>
        </div>
    );
};

export default Modalidades;
