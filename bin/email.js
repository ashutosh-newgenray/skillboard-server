const nodemailer = require("nodemailer");

class Mailer {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // generated ethereal user
        pass: process.env.SMTP_PASS, // generated ethereal password
      },
    });
  }
  async sendMail(data) {
    const resp = await this.transporter.verify();
    if (!resp) {
      console.log("Mail Transporter not instantiated");
    } else {
      console.log("Server is ready to take our messages");
      let info = await this.transporter.sendMail({
        from: process.env.SMTP_FROM, // sender address
        to: data.to, // list of receivers
        subject: data.subject, // Subject line
        text: data.text, // plain text body
        html: data.html, // html body
      });
      console.log("Message sent: %s", info.messageId);
    }
  }
}

module.exports = new Mailer();
