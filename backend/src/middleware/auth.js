const jwt = require('jsonwebtoken')
const Register = require('../models/User')

const auth = async(req,res,next) => {
try{
    const token = req.cookies.na;
    const verifyUser = jwt.verify(token , process.env.SECRET_KEY);
    

    const user = await Register.findOne({ _id:verifyUser._id});
    req.token = token;
    req.user = user;
    next();

}catch(e){
    
res.status(400).send('Login to access this page ' + e.message  );
}

}

module.exports = auth;