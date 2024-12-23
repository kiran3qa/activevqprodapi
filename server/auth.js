const express = require('express')
const router = express.Router()

const connection = require('../dbconfig')
const gentoken = require('./gentoken')

const app = express();
app.use(express.json())

router.post('/login', gentoken, async (req, res) => {

    try {
        const { email, passcode } = req.body;
        const ustatus = 1;

        const SQLQuery = "SELECT urole FROM appusers WHERE email='" + email + "' AND passcode ='" + passcode + "' AND ustatus = " + ustatus + "";
        (await connection).query(SQLQuery).then(result => {

            result.recordset.length > 0 ? req.session.vqlogincookie = email : res.status(401).json({'response' : 'Unauthorized' });
            res.status(200).json({"token" :req.token, "role" : result.recordset[0].urole});
        })
    }

    catch (Error) {
        res.status(500).json({ message : Error.message, stack: Error.stack })
    }
})

module.exports = router
