const mongoose=require('mongoose')
const uuidv1= require('uuidv1')
const crypto=require('crypto')
const { timeStamp } = require('console')

const userSchema=mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
       
    },

    hashed_password:{
        type:String,
        required:true
    },
    salt:String
},{timestamps:true})



//virtual fields

userSchema.virtual('password')
.set(function(password){
    this._password=password
    this.salt=uuidv1
    this.hashed_password=this.encryptPassword(password)
})
.get(function(){
    return this.hashed_password
})

//defining methods
userSchema.methods={
    encryptPassword:function(password){
        if(!password) return ''
        try {
          return crypto
          .createHmac('sha1', this.salt) //sha1 is algorithm to generate string
            .update(password)
            .digest('hex')
        } catch (error) {
            return err
        }
    }
}

module.exports=mongoose.model('User',userSchema)