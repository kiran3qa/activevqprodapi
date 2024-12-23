const express = require('express')
const router = express.Router()

const connection = require('../dbconfig');
const { Int } = require('mssql');

const app = express();
app.use(express.json())

router.post('/addemp', async (req, res) => {

    if (req.session.vqlogincookie) {

        try {

            const { empfname, emplname, empemail, empmobile, empimage, empdesg, empdob, empemernumber, empgender, empaddress, emprepmgr, empbloodgrp, empdegcompdate, empdegcompcert, empexpcert, empcv, emppasscode } = req.body
            const empyStatus = 1

            // check the empy email exists
            if (await IsEmpEmailExists(empemail) > 0) {

                res.status(409).json({"message" : "email exists" })
            }

            else {

                //make empy roll no
                const empyRollNumber = await GenEmpyRollNumber('VQ')
                const Query = "INSERT INTO appemployees VALUES('" + empyRollNumber + "','" + empfname + "', '" + emplname + "','" + empemail + "', '" + empmobile + "', '" + empimage + "', '" + empdesg + "', '" + empdob + "','" + empemernumber +"','" + empgender + "', '" + empaddress + "', '" + emprepmgr + "','" + empbloodgrp + "','" + empdegcompdate + "', '" + empdegcompcert + "', '" + empexpcert + "', '" + empcv + "', '" + emppasscode + "','" + empyStatus + "')";

                await connection.then(pool => {
                        return pool.request().query(Query);
                }).then(result => {
                        res.status(200).json({"message" : empfname + " added"})
                })
            }
        }

        catch (error) {
            res.status(500).json({ "message" : error.message, stack : error.stack })
        }
    }

    else {

        res.status(440).json({ "message" : "Session Out" })
    }
})

async function GenEmpyRollNumber(org_name) {

    const getincrementorQuery = "SELECT empidincrementor FROM appempyidgent";
    let getNumber = (await (await connection).query(getincrementorQuery)).recordset[0].empidincrementor;

    getNumber = parseInt(getNumber) + 1;

    const year = new Date().getFullYear().toString();
    await UpdateIncrementor(getNumber);

    return org_name + year +String(getNumber).padStart(5,'0');
}


async function UpdateIncrementor(incrementValue) {

   const UpdateIncrementorQuery = "UPDATE appempyidgent SET empidincrementor= "+ incrementValue +"";
   await (await connection).query(UpdateIncrementorQuery)

}

async function IsEmpEmailExists(empy_email) {

    const Query = "SELECT 1 FROM appemployees WHERE empemail= '" + empy_email + "'";
    return (await (await connection).query(Query)).recordset.length;
}

module.exports = router

