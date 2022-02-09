const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    confirmPassword:{
        type:String,
        required:true,
    },
    tokens:[{
        token:{
            type:String,
            require:true
       }
    }],
    notes:[{
        title:{type:String,
        required:true},
        message:{
            type:String,
            required:true
        }
    }]
})


// Generating jwt token

userSchema.methods.generateAuthToken = async function(){
    try{
            const token = jwt.sign({_id:this._id},
            process.env.SECRET_KEY);
            this.tokens = this.tokens.concat({token:token});
            await this.save();
            return token;

    }
    catch(e){
        console.log(e)
        console.log('jwt token not created')
    }
}


userSchema.methods.addMessage = async function(title , message){
    try{
        this.notes = this.notes.concat({title:title , message : message});
        await this.save();
        return 1;
        
    }
    catch(e){
        console.log(e.message)
    }
}


userSchema.pre("save" , async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10)
        this.confirmPassword = await bcrypt.hash(this.confirmPassword,10)
    ;
    
    }
    next();
})


const User = new mongoose.model("User" , userSchema);
module.exports = User;