const express = require('express')
const router = express.Router()

const connection = require('../dbconfig');
const { pool } = require('mssql');

const app = express();
app.use(express.json())

router.post('/addstudent', async (req, res) => {

    if (req.session.vqlogincookie) {

        try {

            const { fname, lname, father, mother, email, phone, dob, gender, studimage, dmitimage, paddress, caddress, passcode, studclass, school, counsname, counsdate, counstime } = req.body
            const studentStatus = 1

            // check the student email exists
            if (await IsEmailExists(email) > 0) {

                res.status(409).json({"message": "email exists" })
            }

            else {

                //make student roll no
                const studRollNumber = await GenerateRollNumber(dob, father, mother, fname)
                const Query = "INSERT INTO appstudents VALUES('" + studRollNumber + "','" + fname + "', '" + lname + "','" + father + "', '" + mother + "', '" + email + "', '" + phone + "', '" + dob + "','" + gender + "', '" + studimage + "', '" + dmitimage + "','" + paddress + "','" + caddress + "', '" + passcode + "', '" + studclass + "', '" + school + "', '" + counsname + "','" + counsdate + "', '" + counstime + "', " + studentStatus + ")";

                await connection.then(pool => {
                    return pool.request().query(Query);
                }).then(result => {
                    res.status(200).json({"message" : fname + ' added'})
                })
            }
        }

        catch (error) {
            res.status(500).json({ "message" : error.message })
        }
    }

    else {

        res.status(440).json({"response" : "session timeout" })
    }
})

async function GenerateRollNumber(studdob, father, mother, student) {

    const revised_date = typeof studdob === 'string' ? await ConvertDatetoString(new Date(studdob)) : await ConvertDatetoString(studdob)
    return student.charAt(0) + father.charAt(0) + mother.charAt(0) + revised_date.toString()
}

async function ConvertDatetoString(given_Date) {

    const year = given_Date.getFullYear();
    const month = String(given_Date.getMonth() + 1).padStart(2, '0');
    const day = String(given_Date.getDate()).padStart(2, '0');

    return year + month + day

}

async function IsEmailExists(student_email) {

    const Query = "SELECT 1 FROM appstudents WHERE studemail= '" + student_email + "'";
    return (await (await connection).query(Query)).recordset.length;
}

module.exports = router

