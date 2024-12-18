const express = require('express')
const app = express()

const port = 3000
const audio = require('./audio')
const auth = require('./auth')

app.use(express.json())

app.use('/api/audio', audio)
app.use('/api/auth', auth)

app.listen(port, ()=>{

    console.log("server started")
})