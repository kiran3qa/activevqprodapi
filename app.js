const express = require('express')
const app = express()

const PORT = 8000

app.use(express.json())

app.get('/users', (req ,res) =>{

    res.send("Hello")
})

app.listen(PORT, () => {
    console.log('server started')
})