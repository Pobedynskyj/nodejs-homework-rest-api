const sendEmail = require("./sendEmail");
const transporter = require("./nodemailerConfig");

module.exports = {
  sendEmail,
  transporter,
};
