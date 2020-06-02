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


app.listen(3000, function(){
    console.log("Server started on port 3000");
});