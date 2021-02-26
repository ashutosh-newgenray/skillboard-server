const nodemailer = require("nodemailer");

class Mailer {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "cyvhncpoz4te4227@ethereal.email", // generated ethereal user
        pass: "SDYcTCE1pcqyJCq8DH", // generated ethereal password
      },
    });
  }
  async sendMail(data) {
    try {
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
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new Mailer();
