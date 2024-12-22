const express = require('express')
const router = express.Router()

const connection = require('../dbconfig')

const app = express();
app.use(express.json())

router.post('/login', async(req, res) => {

    const {email, passcode} = req.body;
    const ustatus = 1;

    await connection.then(pool => {
        return pool.request().query("SELECT urole FROM appusers WHERE email='"+email+"' AND passcode ='"+ passcode +"' AND ustatus = "+ ustatus+ "");
     }).then(result => {
            req.session.vqUserAuthCookie = email
            res.json({authemail : req.session.vqUserAuthCookie ,success : true, response : result.recordset})
     })
})

module.exports = router
