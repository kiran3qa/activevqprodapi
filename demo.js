const express = require('express')
const cors = require('cors')
const app = express()

const port = 3000
const auth = require('./auth')

app.use(express.json())
app.use(cors)

app.use('/api/auth', auth)

app.listen(port, ()=>{

    console.log("server started")
})
