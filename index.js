
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
require('dotenv').config(); // Import the habits router
const ejs = require('ejs')
// const express = require('express');
// const app = express();
const multer = require('multer');
const csvParser = require('csv-parser');
const fs = require('fs');

//setting template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
const upload = multer({ dest: 'uploads/' });

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
    res.render('home' , {files:[],data:null})
})

// Handle file upload and provide CSV data as JSON response
app.post('/upload', upload.single('csvFile'), (req, res) => {
    const filePath = req.file.path;
    const results = [];
  
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (data) => {
        results.push(Object.values(data));
      })
      .on("end", () => {
        fs.unlinkSync(filePath); // Remove the uploaded file
        const files = fs.readdirSync("uploads/");
        const data = results;
        // Return the CSV data as JSON response
        res.render("home", { files: files, data: data }); // Replace `csvData` with the actual data from the CSV file
      });

  });

