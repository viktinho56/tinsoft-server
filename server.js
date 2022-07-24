// server.js
var express = require('express'),
    path = require('path'),
    nodeMailer = require('nodemailer'),
    bodyParser = require('body-parser');

    var app = express();
    //app.set('view engine', 'ejs');
    //app.use(express.static('public'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    var port = 3000;
    app.get('/', function (req, res) {
      res.render('index');
    });
    app.post('/send-email', function (req, res) {
      let transporter = nodeMailer.createTransport({
          host: 'mail.tinsoft.tech',
          port: 465,
          secure: true,
          auth: {
              user: 'contact@tinsoft.tech',
              pass: '@Hidemyass2'
          }
      });
      let mailOptions = {
          from: req.body.email, // sender address
          to: '"Tinsoft" <contact@tinsoft.tech>,<viktinho56@gmail.com>', // list of receivers
          subject: req.body.subject, // Subject line
         // text: req.body.body, // plain text body
          html: `<div><label>Name : </label>`+req.body.name+`</label></div>
          <div><label>Phone : </label>`+req.body.phone+`</label></div>
          <div><label>Message : </label>`+req.body.message+`</label></div>` // html body
      };

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
              res.json({message:'message sent'});
          });
      });
          app.listen(port, function(){
            console.log('Server is running at port: ',port);
          });