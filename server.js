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
 
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "thanveerahamed1100@gmail.com ,reyaskhan001@gmail.com , sales@cloudcreatorz.com",
      subject: subject,
      html:`<style>
    /* General Reset */
    body {
      background-color: #f4f4f4;
      font-family: 'verdana, Fira Sans', Helvetica, Arial, sans-serif;
      font-size: 16px;
      line-height: 1.5;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      width: 100% !important;
    }

    /* Container */
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #e0e0e0;
      background-color: #ffffff;
    }

    /* Header */
    .header {
      display: flex;
      align-items: center;
      background-color: #1a1a1a;
      padding: 20px;
      color: #ffffff;
    }

    .header img {
      width: 120px;
      margin-right: 20px;
    }

    .header h5 {
      margin: 0;
      font-size: 10px;
      color: #ffffff;
    }

    /* Body */
    .main {
      padding: 20px;
      text-align: center;
      background-color: #595757;
    }

    .main h2 {
      color: #333;
      font-size: 22px;
      margin: 0 0 10px;
    }

    .main p {
      color: #555;
      font-size: 16px;
      margin: 0 0 20px;
    }

    /* Details Section */
    .details {
      background-color: #f9f9f9;
      padding: 20px;
      border-radius: 5px;
      margin-top: 20px;
      text-align: left;
    }

    .details p {
      font-size: 16px;
      color: #333;
      margin: 5px 0;
    }

    .details strong {
      color: #000;
    }

    /* Footer */
    .footer {
      background-color: #1a1a1a;
      padding: 15px;
      text-align: center;
      color: white;
      margin-top: 20px;
    }

    .footer p {
      margin: 5px 0;
      font-size: 12px;
    }

    /* Responsive Design */
    @media (max-width: 600px) {
      .header h1 {
        font-size: 20px;
      }
      .main h2 {
        font-size: 20px;
      }
      .details p {
        font-size: 14px;
      }
      .footer p {
        font-size: 10px;
      }
    }
  </style>
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0;">
        <!-- Header Section -->
        <header style="display: flex; align-items: center; justify-content: space-between; background-color: #1a1a1a; padding: 20px; color: #ffffff;">
          <div style="flex: 1;">
            <img src="${logoUrl}" alt="Company Logo" style="width: 120px;">
          </div>
          <div style="flex: 2; text-align: left;">
            <h5 style="margin: 0; font-size: 24px; color: #ffffff;">Cloud Creatorz</h5>
          </div>
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
          <footer style="background-color: #1a1a1a; padding: 15px; text-align: center; color: white; margin-top: 20px;">
            <p style="margin: 0; font-size: 14px;color: white;">&copy; ${new Date().getFullYear()} Cloud Creatorz</p>
            <p style="margin: 0; font-size: 12px;color: white;">1234 Street Address, City, State, Zip Code</p>
            <p style="margin: 0; font-size: 12px;color: white;">Phone: (123) 456-7890 | Email: <a href="mailto:sales@cloudcreatorz.com">sales@cloudcreatorz.com</a></p>
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

//booking appointment code
app.post('/book-email', async (req, res) => {
  const {date,timeSlot,note,email,name}=req.body
  console.log(email)
  try {
 
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: `reyaskhan001@gmail.com , sales@cloudcreatorz.com,${email}`,
      subject: "Meeting Confirmation",
      html:`<style>
    /* General Reset */
    body {
      background-color: #f4f4f4;
      font-family: 'verdana, Fira Sans', Helvetica, Arial, sans-serif;
      font-size: 16px;
      line-height: 1.5;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      width: 100% !important;
    }

    /* Container */
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #e0e0e0;
      background-color: #ffffff;
    }

    /* Header */
    .header {
      display: flex;
      align-items: center;
      background-color: #1a1a1a;
      padding: 20px;
      color: #ffffff;
    }

    .header img {
      width: 120px;
      margin-right: 20px;
    }

    .header h5 {
      margin: 0;
      font-size: 10px;
      color: #ffffff;
    }

    /* Body */
    .main {
      padding: 20px;
      text-align: center;
      background-color: #595757;
    }

    .main h2 {
      color: #333;
      font-size: 22px;
      margin: 0 0 10px;
    }

    .main p {
      color: #555;
      font-size: 16px;
      margin: 0 0 20px;
    }

    /* Details Section */
    .details {
      background-color: #f9f9f9;
      padding: 20px;
      border-radius: 5px;
      margin-top: 20px;
      text-align: left;
    }

    .details p {
      font-size: 16px;
      color: #333;
      margin: 5px 0;
    }

    .details strong {
      color: #000;
    }

    /* Footer */
    .footer {
      background-color: #1a1a1a;
      padding: 15px;
      text-align: center;
      color: white;
      margin-top: 20px;
    }

    .footer p {
      margin: 5px 0;
      font-size: 12px;
    }

    /* Responsive Design */
    @media (max-width: 600px) {
      .header h1 {
        font-size: 20px;
      }
      .main h2 {
        font-size: 20px;
      }
      .details p {
        font-size: 14px;
      }
      .footer p {
        font-size: 10px;
      }
    }
  </style>
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0;">
        <!-- Header Section -->
        <header style="display: flex; align-items: center; justify-content: space-between; background-color: #1a1a1a; padding: 20px; color: #ffffff;">
          <div style="flex: 1;">
            <img src="${logoUrl}" alt="Company Logo" style="width: 120px;">
          </div>
          <div style="flex: 2; text-align: left;">
            <h5 style="margin: 0; font-size: 24px; color: #ffffff;">Cloud Creatorz</h5>
          </div>
        </header>

          <!-- Body Section -->
          <main style="padding: 20px; text-align: center;">
  <h2 style="color: #333;">Meeting Confirmation Mail</h2>
  <p style="color: #555;">A meeting has been scheduled. Below are the details:</p>

  <!-- Booking Details Section -->
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin-top: 20px; text-align: left;">
    <p style="margin: 5px 0; color: #333; font-size: 16px;">
      <strong>Name:</strong> ${name}
    </p>
    <p style="margin: 5px 0; color: #333; font-size: 16px;">
      <strong>Email:</strong> ${email}
    </p>
    <p style="margin: 5px 0; color: #333; font-size: 16px;">
      <strong>Date:</strong> ${date}
    </p>
    <p style="margin: 5px 0; color: #333; font-size: 16px;">
      <strong>Time Slot:</strong> ${timeSlot}
    </p>
    <p style="margin: 5px 0; color: #333; font-size: 16px;">
      <strong>Note:</strong> ${note || "No additional notes provided."}
    </p>
     <p style="color: #555;">You will recieve the meeting link in mail shortly</p>

  </div>
</main>


          <!-- Footer Section -->
          <footer style="background-color: #1a1a1a; padding: 15px; text-align: center; color: white; margin-top: 20px;">
            <p style="margin: 0; font-size: 14px;color: white;">&copy; ${new Date().getFullYear()} Cloud Creatorz</p>
            <p style="margin: 0; font-size: 12px;color: white;">1234 Street Address, City, State, Zip Code</p>
            <p style="margin: 0; font-size: 12px;color: white;">Phone: (123) 456-7890 | Email: <a href="mailto:sales@cloudcreatorz.com">sales@cloudcreatorz.com</a></p>
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
