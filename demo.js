const express = require('express')
const cors = require('cors')

const app = express()

const port = process.env.PORT
const IP = "0.0.0.0"

const auth = require('./auth')

app.use(express.json())
app.use(cors)

app.use('/api/auth', auth)

app.listen(port, IP, ()=>{

    console.log("server started")
})
