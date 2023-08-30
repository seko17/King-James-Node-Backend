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

app.get('/data', async (req, res) => {
    const brandsRef = db.collection('brands')
    const mainDocs = [];
    const doc = await brandsRef.get()
    doc.forEach(doc => {
        mainDocs.push({ ...doc.data(), _id: doc.id });
      });

    res.status(200).send(mainDocs)
})


app.listen(port, () => console.log(`Server has started on port: ${port}`))

module.exports = { app }