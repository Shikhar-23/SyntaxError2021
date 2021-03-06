//https://codeburst.io/hitchhikers-guide-to-back-end-development-with-examples-3f97c70e0073
//Thank God and this blessed person for writing this

//Iske bharose hai ab hamara Hackathon

var express = require("express");
var app = express();
var port = 3000;
var MongoClient = require('mongodb');
var passport = require('passport')
 
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/node-demo");

var nameSchema = new mongoose.Schema({
    MailID: String,
    Username: String, 
    Password: String
   });

var User = mongoose.model("User", nameSchema);

app.use(express.static("Login"));

app.use(passport.initialize());

app.get("/", (req, res) => {
 res.sendFile(__dirname + "/Login/login.html");
});
 
app.post("/addname", (req, res) =>{
    var myData = new User(req.body);
    myData.save()
    .then(item => {
    res.send("item saved to database");
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    })
});

app.post("/login", passport.authenticate("local", { 
    successRedirect: "/profile", 
    failureRedirect: "/login", 
    failureFlash: true
}), function (req, res) { 
    console.log("here");
}); 


app.listen(port, () => {
 console.log("Server listening on port " + port);
});