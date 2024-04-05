const express = require('express')
const PORT = 5000
const cors = require('cors')
require("dotenv").config()
const bodyParser = require('body-parser')
const app = express()
const connectDB = require('./config/db')
const productRoute = require('./route/productRoute')
const userRoute = require('./route/userRoute')
const cookieParser = require('cookie-parser')
require("dotenv").config()


app.use(express.json())


app.use(cors({
        origin : "http://localhost:3000",
        methods : "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true, 
    })
)
app.use(cookieParser())

connectDB()

app.use('/Product', productRoute)
app.use('/Category',productRoute)
app.use('/Trends',productRoute)
app.use('/Users',userRoute)
app.use('/Login',userRoute)


app.listen(PORT, ()=>{
    console.log(`Server is listening on the port ${PORT}`)
})