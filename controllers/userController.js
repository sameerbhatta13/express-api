const User=require('../models/userModel')

exports.postUser=async(req,res)=>{
    let user= new User({
        userName:req.body.userName,
        email:req.body.email,
        password:req.body.password
    
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
            return res.status(400).json({error:'email must be unique'})
        }
    })
}
