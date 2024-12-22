const express = require('express')
const router = express.Router()

const connection = require('../dbconfig')

const app = express();
app.use(express.json())

router.post('/addstudent', async (req, res) => {

    if (req.session.vqUserAuthCookie) {

        try {

            const { fname, lname, father, mother, email, phone, dob, gender, studimage, dmitimage, paddress, caddress, passcode, studclass, school, counsname, counsdate, counstime} = req.body
            const studentStatus = 1

            //make student roll no
            const studRollNumber = await GenerateRollNumber(dob, father, mother, fname)
            const Query = "INSERT INTO appstudents VALUES('" + studRollNumber + "','" + fname + "', '" + lname + "','" + father + "', '" + mother + "', '" + email + "', '" + phone + "', '" + dob + "','" + gender + "', '" + studimage + "', '" + dmitimage + "','" + paddress + "','" + caddress + "', '" + passcode + "', '" + studclass + "', '" + school + "', '" + counsname + "','" + counsdate + "', '" + counstime + "', " + studentStatus + ")";

            await connection.then(pool => {
                return pool.request().query(Query);
            }).then(result => {
                res.json({ success: true, response: fname })
            })
        }

        catch (error) {
            res.json({ success: false, response: error.message })
        }
    }

    else {

        res.json({ success: false, response: "Session Out" })
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

module.exports = router

