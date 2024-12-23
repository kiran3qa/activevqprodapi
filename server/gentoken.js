const jwttoken = require('jsonwebtoken')
const SECRETKEY = "ABCDEFGHIJK123456789abcdefghwrtxz@#$%"

const gentoken = (req, res, next) => {

    const token = jwttoken.sign({"email" : req.email}, SECRETKEY, {expiresIn : '1h'});
     req.token = token;
     next();
}

module.exports = gentoken

// const routingcall = (req, res) => {

//     return res.json({"message" : "Hello World"})
// }

// module.exports = routingcall

