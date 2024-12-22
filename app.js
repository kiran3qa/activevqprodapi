const express = require('express')
const app = express()

const PORT = 3000

app.use(JSON.parse())

app.get('/users', (req ,res) =>{

    res.send("Hello")
})

app.listen(PORT, () => {
    console.log('server started')
})
