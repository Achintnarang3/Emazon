require('dotenv').config()

const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const cookieParser = require('cookie-parser')
const cors=require('cors')

// Routes
const authRoutes=require("./routes/auth.js")
const userRoutes=require("./routes/user.js")
const categoryRoutes=require("./routes/category.js")
const productRoutes=require("./routes/product.js")
const orderRoutes = require("./routes/order")
const paymentBRoutes = require("./routes/payment.js")


const app=express()

// Middleware
app.use(cookieParser())
app.use(bodyParser.json())
app.use(cors());



//Routes
app.use("/login",authRoutes)
app.use("/user",userRoutes)
app.use("/category",categoryRoutes)
app.use("/product",productRoutes)
app.use("/order", orderRoutes)
app.use("/payment",paymentBRoutes)

app.get("/",(req,res)=>{
    res.send("hello")
})

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
