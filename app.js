const ejs = require("ejs");
const express = require("express");
const bodyParser = require("body-parser");

const nodemailer = require("nodemailer");
const path = require("path");
const smtpTransport = require('nodemailer-smtp-transport');
//var config = require('./config'); //[env]



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


app.post("/contactPost", function(req, res){
    const output = `
     <p> You have a new contact request </p>
     <h3>Contact Details</h3>
     <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Subject: ${req.body.subject}</li>
     <ul>
     <h3>Message</h3>
      <p>${req.body.message}</p>
    `;
    
      // create reusable transporter object using the default SMTP transport
      var transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        // port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'admastravelnodemailer@gmail.com', // generated ethereal user  --- abe@email.com
          pass: 'TempPass' // generated ethereal password -- password
        },
        tls:{
          rejectUnauthorized:false
        }
      }));
    
      // send mail with defined transport object
      let mailOptions = {
        from: 'admastravelnodemailer@gmail.com', // sender address
        to: "abenezermonjor@gmail.com, monjo003@morris.umn.edu", // list of receivers
        subject: "Contact Me - Admas Travel", // Subject line
        text: "Hello world?", // plain text body
        html: output // html body
      };
    
   // send mail with defined transport object
   transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);   
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
    res.render(__dirname+'/views/contact', {msg:'Email has been sent'});
  });
  });



//if heroku hasn't set up a port use local port
let port = process.env.PORT;
if (port == null || port == "") {
    port =  3000;
}

app.listen(port, function(){
    console.log("Server has started successfully");
});