const express =require('express')
require('dotenv').config()

const db=require('./DB/connection')
const bodyparser=require('body-parser')
const userRoute=require('./routes/userRoute')

const app=express()
port=process.env.PORT || 8000

//middleware
app.use(bodyparser.json())

//routes
app.use('/api',userRoute)

app.listen(port,()=>{
    console.log(`server started on port ${port}`)
})

