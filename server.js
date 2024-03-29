const express = require('express')
const { FieldValue } = require('firebase-admin/firestore')
const nodemailer = require('nodemailer');
const app = express()
const port = 8383
const cors = require('cors');
const { db } = require('./firebase-admin.js')
require('dotenv').config();
const { loadEmailTemplate } = require('./emailTemplates/emailTemplate.js'); // Adjust the path accordingly

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET','POST','DELETE','PUT');
//     next();
// })


//routes
app.post('/addBrand', async (req, res) => {
    const { name, url } = req.body
    const brandsRef = db.collection('brands')
    const res2 = await brandsRef.add({
        brandName: name,
        imgUrl: url
    })
 
    res.status(200).send(res2)
})

app.get('/data/:param', async (req, res) => {

    let param = req.params['param'];
    const brandsRef = db.collection('brands')
    const mainDocs = [];

    if(param === "order"){
        const doc = await brandsRef.orderBy('brandName').get();
        doc.forEach(doc => {
            mainDocs.push({ ...doc.data(), _id: doc.id });
          });
    }
   else if (param === "any"){
    const doc = await brandsRef.get()
    doc.forEach(doc => {
        mainDocs.push({ ...doc.data(), _id: doc.id });
      });
   }
   else if(param === "AG"){
    const doc = await brandsRef.where("alphabetRange", ">=", "A")
    .where("alphabetRange", "<=", "G").get();

    doc.forEach(doc => {
        mainDocs.push({ ...doc.data(), _id: doc.id });
      });

   }
   else if(param === "HN"){
    const doc = await brandsRef.where("alphabetRange", ">=", "H")
    .where("alphabetRange", "<=", "N").get();

    doc.forEach(doc => {
        mainDocs.push({ ...doc.data(), _id: doc.id });
      });     
   }
   else if(param === "OU"){
    const doc = await brandsRef.where("alphabetRange", ">=", "O")
    .where("alphabetRange", "<=", "U").get();

    doc.forEach(doc => {
        mainDocs.push({ ...doc.data(), _id: doc.id });
      });
   }
   else if(param === "VZ"){
    const doc = await brandsRef.where("alphabetRange", ">=", "V")
    .where("alphabetRange", "<=", "Z").get();

    doc.forEach(doc => {
        mainDocs.push({ ...doc.data(), _id: doc.id });
      });

   }
    res.status(200).send(mainDocs)
})

//Email routes

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
  auth: {
    user:process.env.GMAIL_USER , 
    pass: process.env.GMAIL_PASSWORD,
  },
});

app.post('/send-email', (req, res) => {
  const { to, subject, text, attachments } = req.body;

  const mailOptions = {
    from: process.env.GMAIL_EMAIL,
    to,
    subject,
    text,
    attachments,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Error sending email' });
    } else {
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Email sent successfully' });
    }
  });
});

app.post('/send-confirm-email', (req, res) => {
    const { to, subject } = req.body;

    // Load HTML template
    const htmlTemplate = loadEmailTemplate('confirm.html');

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html: htmlTemplate,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});


app.listen(port, () => console.log(`Server has started on port: ${port}`))

module.exports = { app }