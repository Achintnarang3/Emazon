require('dotenv').config()

const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const cookieParser = require('cookie-parser')
const cors=require('cors')
const authRoutes=require("./routes/auth.js")



const app=express()

// Middleware
app.use(cookieParser())
app.use(bodyParser.json())
app.use(cors())


//Routes
app.use("/login",authRoutes )


// DB connected !!
mongoose.connect(process.env.DATABASE,
    {
        useNewUrlParser: true,
        useCreateIndex:true,
        useUnifiedTopology:true
    }
).then(()=>{
    console.log("DB CONNECTED")
}).catch((err)=>{
    console.log(err)
}) 

// port connected.
const port=5000||process.env.PORT

app.listen(port,()=>{
    console.log(`App is running on ${port}`)
})
