const mongoose=require('mongoose')

const connectionString=process.env.CONNECTION_STRING
mongoose.connect(connectionString).then(res=>{
    console.log("mongo db atlas connected to your server");
    
}).catch(err=>{
    console.log("connection failed");
    console.log(err);
    
    
})