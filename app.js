const express = require('express')
const app = express()

const auth = require('./server/auth')

const PORT = 8000

app.use(express.json())

app.use('/users', auth)

app.listen(PORT, () => {
    console.log('server started')
})
