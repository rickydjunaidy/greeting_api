const TB_CARD = require("../models/tb_card.model.js");


// ------------------------- 1 TASK: REFACTOR-------------------------------//
const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'notificationnodemailerricky@gmail.com',
        pass: 'kjbeicxmlqbriohu'
    }
});

// ------------------------- 1 TASK: REFACTOR-------------------------------//

exports.get_mail = (req, res) => {
    const fs = require('fs');

    // Render the HTML file with the replaced image path
    const greeting_card_html = fs.readFileSync('app/template/greeting_card_template.html', 'utf8');

    res.send(greeting_card_html)
};

exports.send_mail = (req, res) => {
    const fs = require('fs');

    // Render the HTML file with the replaced image path
    const greeting_card_html = fs.readFileSync('app/template/greeting_card_template.html', 'utf8');
    if (req.body) {
        save_record_to_db(req, res)
        send_email(req.body.email_from, req.body.email_to, greeting_card_html)
        res.send("Email Berhasil Dikirim")
    }

    
};


function send_email(email_from, email_to, template,){

    // setup email data with unicode symbols
        let mailOptions = {
            from: email_from, // sender address
            to: email_to, // receiver email
            subject: "Kartu Ucapan dari" + email_from, // Subject line
            text: "",
            html: template,
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
        });

}

function save_record_to_db(req, res) {
    const tb_card = new TB_CARD({
        email_from: req.body.email_from,
        email_to: req.body.email_to,
        sent: req.body.sent
    });
  
    // Save TB_CARD in the database
    TB_CARD.create(tb_card, (err, data) => { console.log("Created new TB Card") });
}

