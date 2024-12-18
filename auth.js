const express = require('express')
const router  = express.Router()

const sql = require('./db')

router.get('/users', async(req, res) => {

    try {

        const request = new sql.Request()

        // Run a simple SQL query
        const result = await request.query('SELECT * FROM appusers')// Example table: Users
        res.status(200).json(result.recordset);
      }

      catch (err) {
        res.status(500).json({ error: err.message });
      }
})

module.exports = router



