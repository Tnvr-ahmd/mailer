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

app.use('/public', express.static('public'));
const logoUrl = `https://mailer-qobf.onrender.com/public/logo.png`;
// API route to send an email
app.post('/send-email', async (req, res) => {
  const {name,to,subject,text}=req.body
  console.log(to)
  try {
    //,reyaskhan001@gmail.com  sales@cloudcreatorz.com , 
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "thanveerahamed1100@gmail.com",
      subject: subject,
      html:`<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0;">
          <!-- Header Section -->
          <header style="background-color: #1a1a1a; padding: 20px; text-align: center; color: white;">
            <img src=${logoUrl} alt="Company Logo" style="width: 120px; margin-bottom: 10px;">
            <h1 style="margin: 0;">cloud creatorz </h1>
          </header>

          <!-- Body Section -->
          <main style="padding: 20px; text-align: center;">
            <h2 style="color: #333;">New Contact Form Submission</h2>
            <p style="color: #555;">You have received a new message from the contact form on your website.</p>

            <!-- Details Section -->
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin-top: 20px;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${to}</p>
              <p><strong>Message:</strong></p>
              <p style="color: #333; font-style: italic;">${text}</p>
            </div>
          </main>

          <!-- Footer Section -->
          <footer style="background-color: #4CAF50; padding: 15px; text-align: center; color: white; margin-top: 20px;">
            <p style="margin: 0; font-size: 14px;">&copy; ${new Date().getFullYear()} Your Company Name</p>
            <p style="margin: 0; font-size: 12px;">1234 Street Address, City, State, Zip Code</p>
            <p style="margin: 0; font-size: 12px;">Phone: (123) 456-7890 | Email: support@yourdomain.com</p>
          </footer>
        </div>` , 
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
