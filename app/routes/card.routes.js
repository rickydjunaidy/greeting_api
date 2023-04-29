module.exports = app => {
    const TB_CARD_CONTROLLER = require("../controllers/tb_card.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/create", TB_CARD_CONTROLLER.create);
  
    app.use('/api/card', router);
  };