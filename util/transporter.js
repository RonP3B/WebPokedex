const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  port: 587,
  auth: {
    user: "roniellbookapp@gmail.com",
    pass: "ewruyzbpkvfmtrjo",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;