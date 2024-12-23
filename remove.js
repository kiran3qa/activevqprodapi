const express = require('express')
const router = express.Router()

const routingcall = require('./gentoken')
const connection = require('../dbconfig');

const app = express();
app.use(express.json())

router.get('/erase', async (req, res) => {

    const Query = "DELETE FROM appemployees";
    (await connection).query(Query).then(results => {
        return results.recordset
    }).then(response => {
        res.json({success : true, message : "Empys Deleted"})
    })
})

// router.get('/routingcheck/:empid', routingcall , (req, res) =>{

//     res.send().json();
// })

module.exports = router
