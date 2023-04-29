const sql = require("./db.js");

// constructor
const TB_CARD = function(data) {
    console.log(data)
    this.email_from = data.email_from; //varchar(255)
    this.email_to = data.email_to; //varchar(255)
    this.sent = data.sent; //bool
};

TB_CARD.create = (new_tb_card, result) => {
    sql.query("INSERT INTO `tb_card` SET ?", new_tb_card, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
        }

        console.log("created tb_card: ", { ...new_tb_card });
        result(null, { ...new_tb_card });
    });
    // result(null, new_tb_card)
};

module.exports = TB_CARD