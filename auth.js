const express = require('express')
const router  = express.Router()

const sql = require('./db')

router.post('/login', async(req, res) => {

    try {
        // extract body
        const {email,passcode } = req.body;
        const user_status = 1

        // Run a simple SQL query
        const request = new sql.Request();
        const result = await request
        .input('email', sql.VarChar, email)
        .input('passcode', sql.VarChar, passcode)
        .input('ustatus', sql.Bit, user_status)
        .query('SELECT urole FROM appusers WHERE email=@email AND passcode=@passcode AND ustatus=@ustatus ');

        res.status(200).json(result.recordset);
      }

      catch (err) {
        res.status(500).json({ error: err.message });
      }
})

module.exports = router



