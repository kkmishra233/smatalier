const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();

// set view engine
app.engine('handlebars', exphbs({defaultLayout: 'main' , layoutDir: __dirname + "/views"}));
app.set('view engine', 'handlebars');

// body parser middle ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set public folder
app.use('/public', express.static(path.join(__dirname,'public')));

//home page
app.get('/' , (req, res) => {
	res.render('contact');
});  

app.listen(3000, () => console.log("Server Started .."))

//service - commercial page
app.get('/commercial' , (req, res) => {
  res.render('Commercial');
});

//service - design page
app.get('/design' , (req, res) => {
  res.render('Design');
});  
//service - kitchen page
app.get('/kitchen' , (req, res) => {
  res.render('Kitchen');
});  
//service - retail page
app.get('/retail' , (req, res) => {
  res.render('Retail');
});
//service - renovation page
app.get('/renovation' , (req, res) => {
  res.render('Renovation');
}); 
//service - styling page
app.get('/styling' , (req, res) => {
  res.render('Styling');
}); 

//send email post

app.post('/' , (req, res) => {
	console.log(req.body);
	const output = `
	<p>You have a new Query </p>
	<h3>Here are the Contact Details</h3>
	<ul>
		<li>First Name : ${req.body.fname}</li>
		<li>Last Name : ${req.body.lname}</li>
		<li>Email Address : ${req.body.email}</li>
		<li>Cell Number : ${req.body.cell}</li>
	</ul>
	<h3>Subject</h3>
	<p>${req.body.subject}</p>
	<h3>Message</h3>
	<p>${req.body.message}</p>
	`;

// create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "smatelier19@gmail.com", // generated ethereal user
      pass: "blessed1994" // generated ethereal password
    },
    tls:{
    	rejectUnauthorized:false
    }
  });

 // send mail with defined transport object
  transporter.sendMail({
    from: '"SMAtelier : you have a new Query !" <smatelier19@gmail.com>', // sender address
    to: "info@smateliers.com,kkbit233@gmail.com",// list of receivers
    subject: "You have a new Query", // Subject line
    text: "Hello Admin", // plain text body
    html: output // html body
  });

  // console.log("Message sent: %s", info.messageId);
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  res.render('contact',{msg:'Email has been sent successfully !'})
});





