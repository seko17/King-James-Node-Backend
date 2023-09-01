const express = require('express')
const { FieldValue } = require('firebase-admin/firestore')
const app = express()
const port = 8383
const { db } = require('./firebase-admin.js')

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET','POST','DELETE','PUT');
    next();
})


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


app.listen(port, () => console.log(`Server has started on port: ${port}`))

module.exports = { app }