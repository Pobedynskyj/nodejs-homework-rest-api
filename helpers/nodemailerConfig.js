const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "",
  port: 465,
  secure: true,
  auth: {
    user: "punkglue1@gmail.com",
    pass: META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const email = {
  to: "arrowtime.ua@gmail.com",
  from: "punkglue1@gmail.com",
  subject: "New post",
  html: "<p>New POST</p>",
};

transporter
  .sendMail(email)
  .then(() => console.log("Succes"))
  .catch((error) => error.message);

module.exports = transporter;
