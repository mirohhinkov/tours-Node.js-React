const nodemailer = require('nodemailer');

const sendmail = async (options) => {
  //1. create a transporter
  // create a service which we gonna use to send e-mail(like g-mail)

  const transporter = nodemailer.createTransport({
    // service: 'Gmail',
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    //activate in app less secure app option
  });
  //2.define the e-mail options
  const mailOptions = {
    from: 'Miro Hin <miroh@mail.bg>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  //3.send the e-mail
  await transporter.sendMail(mailOptions);
};

module.exports = sendmail;
