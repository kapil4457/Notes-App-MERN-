require('dotenv').config()
const express = require('express');
const app = express();
require('./src/db/conn')
const User = require('./src/models/User')
const PORT = process.env.PORT || 8000;
const cookieParser = require('cookie-parser')
const cors = require('cors')
const bcrypt = require('bcrypt')
const auth = require('./src/middleware/auth')
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
const jwt = require('jsonwebtoken')


app.get('/', (req, res) => {
    res.send('Home Page')
})




app.post('/register' , async(req,res)=>{
try{
const userInfo = new User({
    name : req.body.name,
    email:req.body.email,
    password : req.body.password,
    confirmPassword :req.body.confirmPassword,
})



    const UserExist =await User.findOne({email:userInfo.email});
    if(UserExist){
        res.status(400).json({error:"User already exists"})
    }else{
          
        const token = await userInfo.generateAuthToken();
           
        const registered = await userInfo.save();
        res.status(201).send('Successfully registered')
    }

}catch(e){
    console.log('Error registering')
    console.log(e.message)
}
})


app.get('/logout' , auth , async(req,res)=>{
    try{
         req.user.token=[];
        res.clearCookie("na");
        await req.user.save();
        res.status(200).send('logged out successfully')
    }catch(e){
        res.status(400).send(e.message)
        console.log(e.message)
    }
})


app.post('/login' , async(req,res)=>{
    try{

        const user = await User.findOne({email:req.body.email})
        const isMatch = await bcrypt.compare(req.body.password , user.password);
        const token = await user.generateAuthToken();
        res.cookie("na" , token , {
            expires:new Date(Date.now()+6000000),
            httpOnly:true
        })
        if(isMatch){
            res.status(200).send('logged in successfully' + token);

        }
        else{

            res.status(400).send("Invalid Creditentials")
        }
    }catch(e){
        console.log(e.message);
        res.status(400).send("Invalid Creditentials")
        console.log('Error logging in')
    }
})


app.get('/getMessage' , auth , async(req,res)=>{
try{
    const token = req.cookies.na;
    const verifyUser = jwt.verify(token , process.env.SECRET_KEY); 
const user = await User.findOne({ _id:verifyUser._id});
    res.send(user.notes)
}
catch(e){
    console.log(e.message)
}
})

app.post('/addMessage' ,auth, async(req,res)=>{
    try{
        const token = req.cookies.na;
        const verifyUser = jwt.verify(token , process.env.SECRET_KEY);
    

    const user = await User.findOne({ _id:verifyUser._id});
        const note = await user.addMessage(req.body.title , req.body.message);
        res.status(201).send('Note aded successfully')
    }catch(e){
        console.log(e.message);
        res.status(401).send(e.message)
    }
})





app.listen(PORT , ()=>{
console.log(`listening on port ${PORT}`)
})