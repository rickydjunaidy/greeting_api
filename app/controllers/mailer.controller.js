exports.send_mail = (req, res) => {
    const fs = require('fs');

    // Render the HTML file with the replaced image path
    const greeting_card_html = fs.readFileSync('app/template/greeting_card_template.html', 'utf8');

    res.status(200).send(greeting_card_html)
};