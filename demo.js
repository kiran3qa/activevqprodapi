const express = require('express')
const cors = require('cors')

const app = express()

const PORT = process.env.PORT || 3000; // Default to port 3000 if PORT is undefined
const IP = process.env.IP || '0.0.0.0';

const auth = require('./auth')

app.use(express.json())
app.use(cors)

app.use('/api/auth', auth)

app.listen(PORT, IP, ()=>{

    console.log("server started")
})
