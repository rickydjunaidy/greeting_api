const TB_CARD = require("../models/tb_card.model.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    
    // console.log(req)
    // Create a tb_card_model
    const tb_card = new TB_CARD({
        email_from: req.body.email_from,
        email_to: req.body.email_to,
        sent: req.body.sent
    });
  
    // Save Tutorial in the database
    TB_CARD.create(tb_card, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the tb_card."
        });
      else res.send(data);
    });
  };