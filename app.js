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

app.listen(5000, () => console.log("Server Started .."))

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
  if (!req.body.fname || !req.body.lname || !req.body.email || !req.body.cell) { 
    console.log('Empty Object');
	 res.render('contact',{msg:'Email sending failed!'});
  }
else {
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

  global.thisisOtherThanEnglishMatch;
  thisisOtherThanEnglishMatch = false;
  
  try {
    console.log("entering try block");
    
    function nlpfunc(_callback) {
        var textToDetect = `${req.body.message}`;
        var CloudmersiveNlpApiClient = require('cloudmersive-nlp-api-client');
        var defaultClient = CloudmersiveNlpApiClient.ApiClient.instance;
        // Configure API key authorization: Apikey
        var Apikey = defaultClient.authentications['Apikey'];
        Apikey.apiKey = `${process.env.NLP_API_KEY}`;
        var apiInstance = new CloudmersiveNlpApiClient.LanguageDetectionApi();
        
        var callback = function(error, data, response) {
          if (error) {
            console.error(error);
          } else {
            parsed_data = JSON.stringify(data)
              if(parsed_data.DetectedLanguage_FullName != "English"){
                thisisOtherThanEnglishMatch = true;
                console.log("Setting language name flag is "+thisisOtherThanEnglishMatch)
              }
          }
        };
      apiInstance.languageDetectionPost(textToDetect,callback);
      console.log("Getting language name flag is "+ thisisOtherThanEnglishMatch)
      _callback()
    }

    function sendFunction(){
        nlpfunc(function() {
            console.log('I\'m done!');
        });
    }
    sendFunction()

    if (thisisOtherThanEnglishMatch === true){
      res.render('contact');
    }
    else{
      let nodemailer = require('nodemailer');
      const dotenv = require('dotenv');
      dotenv.config();

      let mailerConfig = {    
          host: "smtp.gmail.com",  
          secureConnection: false,
          port: 587,
          tls: {
              rejectUnauthorized:false
          },
          auth: {
              user: "smatelier19@gmail.com",
              pass: `${process.env.SMTP_PASSWORD}`
          }
      };
      let transporter = nodemailer.createTransport(mailerConfig);

      let mailOptions = {
          from: mailerConfig.auth.user,
          to: 'info@smateliers.com',
          subject: "You have a new Query",
          text: "Hello Admin", 
          html: output
      };

      transporter.sendMail(mailOptions, function (error) {
          if (error) {
              console.log('error:', error);
          } else {
              console.log('Email successfully sent . very good');
          }
      });
      res.render('contact',{msg:'Email has been sent successfully !'})
    }

  }
  catch (e) {
    console.log("entering catch block");
    console.log(e);
    let nodemailer = require('nodemailer');
    const dotenv = require('dotenv');
    dotenv.config();

    let mailerConfig = {    
        host: "smtp.gmail.com",  
        secureConnection: false,
        port: 587,
        tls: {
            rejectUnauthorized:false
        },
        auth: {
            user: "smatelier19@gmail.com",
            pass: `${process.env.SMTP_PASSWORD}`
        }
    };
    let transporter = nodemailer.createTransport(mailerConfig);

    let mailOptions = {
        from: mailerConfig.auth.user,
        to: 'info@smateliers.com',
        subject: "You have a new Query",
        text: "Hello Admin", 
        html: output // html body

    };

    transporter.sendMail(mailOptions, function (error) {
        if (error) {
            console.log('error:', error);
        } else {
            console.log('Email successfully sent . very good');
        }
    });
    res.render('contact',{msg:'Email has been sent successfully !'})
    console.log("leaving catch block");
  }
}
});





