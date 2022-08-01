const nodemailer = require("nodemailer");

const sendEmail = async (options, next) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      secureConnection: false,
      port: 587,

      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        ciphers: "SSLv3",
      },
    });

    const mailOptions = {
      from: "Superusers Corp <superuserstesting@outlook.com>",
      to: options.email,
      subject: options.subject,
      text: options.message,
    };

    await transporter.sendMail(mailOptions, function (err) {
      return next(err);
    });
  } catch (err) {
    next(err);
  }
};

module.exports = sendEmail;
