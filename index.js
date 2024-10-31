// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configurar nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // Usa 'gmail' o tu servicio de correo
  auth: {
    user: 'tu-email@gmail.com',
    pass: 'tu-contraseña' // O usa una contraseña de aplicación
  }
});

app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'destino@example.com', // Reemplaza con tu email de destino
    subject: `Nuevo mensaje de ${name}`,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error al enviar el correo');
    } else {
      console.log('Correo enviado: ' + info.response);
      res.status(200).send('Correo enviado con éxito');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
