// Lida com o envio do formulário de anamnese
document.getElementById('form-anamnese').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
  
    try {
      const response = await fetch('/api/marcar-anamnese', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        alert('Anamnese marcada com sucesso!');
        e.target.reset();
      } else {
        alert('Erro ao marcar anamnese.');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao marcar anamnese.');
    }
  });
  