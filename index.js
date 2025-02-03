require('dotenv').config()
const express=require('express')
const cors=require('cors')
const router=require('./routes/router')
require('./db/connection')

const elServer=express()
elServer.use(cors())
elServer.use(express.json())
elServer.use(router)

const PORT=3000 || process.env.PORT

elServer.listen(PORT,()=>{
    console.log(`server running at port ${PORT}`);
    
})

elServer.get('/',(req,res)=>{

    res.status(200).send(`<h1>E-Learning server started and waiting for client request</h1>`)
   
})