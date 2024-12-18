const express = require('express')
const app = express()

const port = 3000
const auth = require('./auth')

app.use(express.json())

app.use('/api/auth', auth)

app.listen(port, ()=>{

    console.log("server started")
})