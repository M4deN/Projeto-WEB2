const nodemailer = require('nodemailer');
const Swal = require('sweetalert2');

// Função para enviar e-mail
exports.enviarEmail = (req, res) => {
  const { nome, email, assunto, mensagem } = req.body;

  // Configuração do nodemailer para enviar o e-mail
  const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USUARIO,
      pass: process.env.EMAIL_SENHA,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USUARIO,
    to: process.env.EMAIL_DESTINO,
    subject: assunto,
    text: `Nome: ${nome}\nE-mail: ${email}\nAssunto: ${assunto}\n\n${mensagem}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      // Exibir mensagem de erro em um pop-up
      res.send('<script>alert("Ocorreu um erro ao enviar a mensagem."); window.location.href = "/contato";</script>');
    } else {
      console.log('E-mail enviado: ' + info.response);
      // Exibir mensagem de sucesso em um pop-up e redirecionar para a página de contato
      res.send('<script>alert("Mensagem enviada com sucesso!"); window.location.href = "/contato";</script>');
    }
  });
};

