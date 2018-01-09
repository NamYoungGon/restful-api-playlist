const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

mongoose.connect('mongodb://test:1234@ds247587.mlab.com:47587/restful-playlist')
mongoose.Promise = global.Promise

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extends: false }))
app.use('/api', require('./routes/api'))

// error handleing middleware
app.use((err, req, res, next) => {
    res.status(422).send({ error: err.message })
})

app.listen(process.env.port || 3000, () => {
    console.log('listening for requests')
})