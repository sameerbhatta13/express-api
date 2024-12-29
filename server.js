const express =require('express')
require('dotenv').config()


const app=express()
port=process.env.PORT || 8000



app.listen(port,()=>{
    console.log(`server started on port ${port}`)
})

