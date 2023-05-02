module.exports = app => {
    const MAILER_CONTROLLER = require("../controllers/mailer.controller.js");
  
    var router = require("express").Router();

    router.get("/send_mail/:id", MAILER_CONTROLLER.get_mail);
    router.post("/send_mail/send", MAILER_CONTROLLER.send_mail);
  
    app.use('/api/mail', router);
  };