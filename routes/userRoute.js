const express=require('express')
const { postUser, signIn, forgetPassword, resetPassword } = require('../controllers/userController')

const router=express.Router()

router.post('/register',postUser)   
router.post('/signin',signIn)
router.post('/forget/password',forgetPassword)
router.put('/reset/password/:token',resetPassword)



module.exports=router