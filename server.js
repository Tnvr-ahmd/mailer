const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
require('dotenv').config();
const cors=require('cors')
app.use(cors())
app.use(express.json())

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,  
        pass: process.env.EMAIL_PASS
    }
});


// API route to send an email
app.post('/send-email', async (req, res) => {
  const {name,to,subject,text}=req.body
  console.log(to)
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "sales@cloudcreatorz.com",
      subject: subject,
      text: text,
      html: '<p>Hello, this is a test email.</p>', 
    });
   
   console.log('Email sent:', info.messageId);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email', error });
  }
});
app.all("/",(req, res, next) => {
  res.status(404).json({ message: "404 - Page Not Found" });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
