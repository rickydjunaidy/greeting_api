const TB_CARD = require("../models/tb_card.model.js");

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
    }

    //res.send(greeting_card_html)
};

function send_email(email_from, email_to, template){
    console.log("SENNNNT!")
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