const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const sendResetPasswordMail = async (email, link) => {
  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: email,
    subject: 'Restablecer contraseña - Cafeto',
    html: `
      <h2>Restablecer contraseña</h2>
      <p>Hacé click en el botón para crear una nueva contraseña</p>
      <a href="${link}" style="padding:10px 15px; background:#000; color:#fff; text-decoration:none">
        Restablecer contraseña
      </a>
      <p>Este enlace expira en 1 hora.</p>
    `
  });
};

module.exports = { sendResetPasswordMail };