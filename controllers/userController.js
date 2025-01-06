const User=require('../models/userModel')
const Token=require('../models/tokenModel')
const crypto=require('crypto')
const jwt=require('jsonwebtoken') //authentication 

exports.postUser=async(req,res)=>{
    let {username,email,password}=req.body
    let user= new User({
        
        userName:username,
        email,
        password
    })
    User.findOne({email:user.email}).then(async data=>{
        if(data==null){
            user=await user.save()
            if(!user){
                return res.status(400).json({error:'something went wrong'})
            }
            res.send(user)
        }
        else{
            return res.status(400).json({error:'email must be '})
        }
    })
}


exports.signIn=async(req,res)=>{
    const {email,password}=req.body

    const user=await User.findOne({email})
    if(!user){
        return res.status(403).json({error:'something went wrong'})
    }

    if(!user.authenticate(password)){
        return res.status(400).json({error:"email and password does not match"})
    }

   const token=jwt.sign({_id:user.id},process.env.JWT_SECRET)

   //Store in the cookie
   res.cookie('mycookie',token,{expire:Date.now()+9999999})

   const {_id,userName}=user
   return res.json({token, user:{_id,userName,email}})
}

//forget password

exports.forgetPassword=async(req,res)=>{
    const user=await User.findOne({email:req.body.email})
    if(!user){
        return res.status(400).json({error:"email does not match"})
    }
    let token= new Token({
        userId:user._id,
        token:crypto.randomBytes(16).toString('hex')

    })
    token=await token.save()
    if(!token){
        return res.status(400).json({error:'failed to create a token'})
    }
}

exports.resetPassword=async (req,res) => {
    let token=await Token.findOne({token:req.params.token})
    if(!token){
        return res.status(400).json({error:'invalid token or token may expired'})
    }
    //if token found
    let user= await User.findOne({_id:token.userId})
    if(!user){
        return res.status(400).json({error:'unable to find the valid user '})
    }
    user.hashed_password=req.body.password //this req.body.password and not used hashed password is used from virtual field password
    user=await user.save()
    if(!user){
        return res.status(400).json({error:'failed to reset password '})
    }
    res.json({msg:'password reset successfully'})
}