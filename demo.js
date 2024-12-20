const express = require('express')
const cors = require('cors')
const environment = require('dotenv').config();

const app = express()

const port = process.env.PORT
const auth = require('./auth')

app.use(express.json())
app.use(cors)

app.use('/api/auth', auth)

app.listen(port, ()=>{

    console.log("server started")
})
