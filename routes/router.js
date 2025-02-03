const express=require('express')

const router=new express.Router()
const userController=require('../controller/userController')

// create route for register user

router.post('/register',userController.userRegister)

// route for user login
router.post('/login',userController.userLogin)


module.exports=router