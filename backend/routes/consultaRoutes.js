router.post('/marcar-anamnese', async (req, res) => {
    const { nome, email, telefone, motivo, data } = req.body;
  
    try {
      // Aqui você pode salvar a anamnese no banco de dados ou apenas enviar uma notificação por e-mail.
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: [email, process.env.PHYSIOTHERAPIST_EMAIL],
        subject: 'Nova Anamnese Marcada',
        text: `Olá, ${nome} marcou uma anamnese no dia ${data}.\n\nMotivo: ${motivo}.`,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res.status(500).send('Erro ao enviar e-mail.');
        }
        res.status(200).send('Anamnese marcada com sucesso e e-mail enviado.');
      });
  
    } catch (err) {
      res.status(500).send('Erro ao marcar anamnese.');
    }
  });
  