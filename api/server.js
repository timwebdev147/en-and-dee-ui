const express = require('express')
const http = require('http')
const { default: mongoose } = require('mongoose')
const dotenv = require('dotenv').config()
const cors = require('cors')
const cookieSession = require("cookie-session");
const authRouter = require("./routes/auth");
const app =  express()
const logger = require('morgan');
const uuidv4 = require('uuid').v4;

 var corsOption = {
    origin: '*'
 }

 app.use(cors(corsOption));
 app.use(logger("dev"));

 //parse requests of  content-type - application/json
 app.use(express.json())
 
 //parse requests of  content-type - application/x-www-form-urlencoded
 app.use(express.urlencoded({extended: true}))

 app.use("/api", authRouter);
 app.use('*', (req, res) => {
    return res.status(404).json({
      success: false,
      message: 'API endpoint doesnt exist'
    })
  });





const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(5000, () => {
            console.log(`serving running on port 5000 `);
        })
    })
    .catch((error) => {
        console.log(error.message);
    })


  