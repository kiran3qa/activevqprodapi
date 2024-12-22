const express = require('express')
const session = require('express-session')
const app = express()

const auth = require('./server/auth')
const student = require('./server/addstudents')

const PORT = 8000

app.use(session({
    secret : "hhfajshdjhdshfjdhsfjhajdhfdh",
    resave : false,
    saveUninitialized : true,
    cookie : {secure : false}
}));

app.use(express.json())

app.use('/users', auth)
app.use('/student', student)

app.listen(PORT, () => {
    console.log('server started')
})
