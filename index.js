
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
require('dotenv').config(); // Import the habits router
const ejs = require('ejs')


//setting template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());

//start app function 
const startApp = ()=>{
    console.log("Db connection success, now starting app");
    app.listen(process.env.serverPort , ()=>{
        console.log("App running on port " , process.env.serverPort);
    })
}

//mongo db connection
const dbUrl = process.env.dbUrl

//in callback of connect, we pass start app 
mongoose.connect(dbUrl).then(startApp);


//route for home 
app.get("/", (req,res,next)=>{
    res.render('home' , {files:[]})
})

