var mongoose = require("mongoose")
const crypto = require("crypto")
const uuidv1 = require("uuidv1")

var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        maxlength:32
    },

    lastname:{
        type:String,
        required:true,
        trim:true,
        maxlength:32
    },

    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },

    encry_password:{
        type:String,
        trim:true,
    },

    role:{
        type:Number,
        default:true
    },

    salt:String,

    purchases:{
        type:Array,
        default:[]
    },

    userinfo:{
        type:String,
        trim:true
    }

},{timestamps:true})

userSchema.methods={

    authenticate:function(plainpassword)
    {
        if(securePassword(plainpassword)!==this.encry_password)
        {
            return "Password is Correct"
        }
    },
    securePassword:function(plainpassword){
        if(!plainpassword)
        return ""

        try{
            return crypto.createHmac('sha256', this.salt)
               .update(plainpassword)
               .digest('hex');

        }
        catch{
            return ""

        }
    }
}

userSchema.virtual("password").
set(function(password){
    this._password=password
    this.salt=uuidv1()
    this.encry_password=this.securePassword(password,this.salt)
}).get(function(){
    return this._password
})

 


module.exports=mongoose.model("User",userSchema)