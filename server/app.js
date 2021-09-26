const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.text())

app.get('/', (req, res) => {
    res.send('Hello route')
})

app.post('/images', async (req, res) => {
    const images = JSON.parse(req.body).images
    const receivedImages = getImages(images)
    receivedImages.forEach(img => {
        res.status(200)
            .contentType('image/jpeg, image/png, text/plain')
            .end(img)
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

const getImages = (imagesArr) => {
    return imagesArr.map(i => {
        const filePath = `/Users/v.parfenyuk//Downloads/${i}`
        return fs.readFileSync(filePath,  {'encoding': 'utf8'})
    })
}
