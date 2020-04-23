const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

//Transportador o enviador del correo
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "recursosudem@gmail.com", // generated gmail user
    pass: "proyectodeaula00", // generated gmail account password
  },
  authentication: "plain",
});

router.post("/send-mail", (req, res) => {
  let info = req.body;

  //Esctructura del correo
  var html =
    '<img src="https://redunete.net/wp-content/uploads/2019/02/logo-blanco-Udem-700x300.jpg" alt="Universidad de Medellín"width="200" height="100"> <p style="color:#FF0040";>Señor usuario</p> <p>Le informamos que se ha creado una cuenta para que usted pueda acceder a diferentes servicios que ofrece la plataforma.</p><p><b>Usuario:</b>' +
    info.id +
    "</p><p><b>Clave: </b>" +
    info.id +
    "</p><p>Podrá cambiar su clave al ingresar a la plataforma. Esta es personal y su buen manejo es su responsabilidad. </p>";

  var mailOptions = {
    from: "U de M",
    to: info.email,
    subject: "Creación de Cuenta",
    html: html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Correo electrónico enviado");
  });
});
module.exports = router;
