const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bolzysam1@gmail.com",
    pass: "fortunatus",
  },
});

const mailOptions = {
  from: "nodemailer@gmail.com",
  to: "cyb3rcykic@gmail.com",
  subject: "Sending Email using Node.js",
  text: "That was easy!",
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) return console.log(error);
  console.log("Email sent to " + mailOptions.to);
});
