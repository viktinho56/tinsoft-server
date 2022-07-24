const express = require("express");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());
//const route = express.Router();
const port = process.env.PORT || 5000;
const transporter = nodemailer.createTransport({
    host: 'mail.tinsoft.tech',
          port: 465,
          secure: true,
          auth: {
              user: 'contact@tinsoft.tech',
              pass: '@Hidemyass2'
          }
});
app.get('/',(req, res) => {
    res.status(200).send({
        message: 'Mail Sent',
       
    })
})
app.post('/send-email', (req, res) => {
    var cors = {
        origin: "*"
    };
    res.header("Access-Control-Allow-Origin", cors.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.type('application/json');
    let mailOptions = {
        from: req.body.email, // sender address
        to: '"Tinsoft" <contact@tinsoft.tech>,<viktinho56@gmail.com>', // list of receivers
        subject: req.body.subject, // Subject line
       // text: req.body.body, // plain text body
        html: `<div><label>Name : </label>`+req.body.name+`</label></div>
        <div><label>Phone : </label>`+req.body.phone+`</label></div>
        <div><label>Message : </label>`+req.body.message+`</label></div>` // html body
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send({
                message: 'Mail Sent',
                message_id: info.messageId
            })
        }
    });
})
//app.use('/v1', route);
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});