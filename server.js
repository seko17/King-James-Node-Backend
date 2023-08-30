const express = require('express')
const { FieldValue } = require('firebase-admin/firestore')
const app = express()
const port = 8383
const { db } = require('./firebase-admin.js')

app.use(express.json())

//routes
app.post('/addBrand', async (req, res) => {
    const { name, url } = req.body
    const brandsRef = db.collection('brands').doc('images')
    const res2 = await brandsRef.set({
        brandName: name,
        imgUrl: url
    }, { merge: true })
 
    res.status(200).send(res2)
})

app.get('/data', async (req, res) => {
    const peopleRef = db.collection('brands').doc('images')
    const doc = await peopleRef.get()
    if (!doc.exists) {
        return res.sendStatus(400)
    }

    res.status(200).send(doc.data())
})


app.listen(port, () => console.log(`Server has started on port: ${port}`))

export default app;