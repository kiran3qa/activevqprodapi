const express = require('express')
const router = express.Router()

const connection = require('../dbconfig')

const app = express();
app.use(express.json())

router.post('/login', (req, res) => {

    const {email, passcode} = req.body;
    const ustatus = 1;

    const query = connection.then(pool => {
        return pool.request().query("SELECT urole FROM appusers WHERE email='"+email+"' AND passcode ='"+ passcode +"' AND ustatus = "+ ustatus+ "");
     }).then(result => {

        res.json({success : true, response : result.recordset})
     })

})

module.exports = router
