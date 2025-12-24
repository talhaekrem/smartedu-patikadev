const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use true for port 465, false for port 587
  auth: {
    user: "", //mail servisi kullanıcı
    pass: "", //mail servisi şifre
  },
});

const getAboutPage = (req, res) => {
  res.status(200).render("about", {
    pageName: "about",
  });
};

const getHomePage = (req, res) => {
  res.status(200).render("index", {
    pageName: "index",
  });
};
const getContactPage = (req, res) => {
  res.status(200).render("contact", {
    pageName: "contact",
  });
};

const getRegisterPage = (req, res) => {
  res.status(200).render("register", {
    pageName: "register",
  });
};

const getLoginPage = (req, res) => {
  res.status(200).render("login", {
    pageName: "login",
  });
};

const sendEmail = async (req, res) => {
  const htmlTemplate = `
  <h1>Message Details</h1>
  <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
  </ul>
  <h2>Message</h2>
  <p>${req.body.message}</p>
  `;
  await transporter.sendMail({
    from: '"SmartEdu Contact Form" <example@example.com>', //mail gönderen kısmı
    to: "example2@example2.com", //mailler kime gidecek
    subject: "SmartEdu Contact Form New Message ✔",
    html: htmlTemplate, // HTML version of the message
  });
  res.status(200).redirect("/contact");
};
module.exports = {
  getAboutPage,
  getHomePage,
  getRegisterPage,
  getLoginPage,
  getContactPage,
  sendEmail,
};
