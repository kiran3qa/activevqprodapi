const express = require('express')
const cors = require('cors')
const env = require('dotenv').config()
const app = express()

const PORT = process.env.PORT || 3000;
const auth = require('./auth')

app.use(express.json())
app.use(cors)

app.use('/api/auth', auth)

app.listen(PORT, '0.0.0.0' ()=>{

    console.log("server started")
})
