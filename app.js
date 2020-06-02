const ejs = require("ejs");
const express = require("express");
const bodyParser = require("body-parser");



const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function(req, res){
    res.render('home');
});

app.get('/about', function(req, res){
    res.render('about');
});

app.get('/contact', function(req, res){
    res.render('contact');
});

app.get('/book', function(req, res){
    res.render('book');
});

//if heroku hasn't set up a port use local port
let port = process.env.PORT;
if (port == null || port == "") {
    port =  3000;
}

app.listen(port, function(){
    console.log("Server has started successfully");
});