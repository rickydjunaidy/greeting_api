const express = require("express");
const cors = require("cors");
const path = require('path');
const fs = require("fs");

const app = express();

var corsOptions = {
  origin: ["http://localhost:8080", "http://localhost:8081"]
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============= TODO REFACTOR =============== //
// STATIC IMAGES
const catto = path.join(__dirname, "app", "src", "images", "catto.PNG");
const fb = path.join(__dirname, "app", "src", "images", "fb.PNG");
const insta = path.join(__dirname, "app", "src", "images", "insta.PNG");
const logo = path.join(__dirname, "app", "src", "images", "logo.PNG");
const pin = path.join(__dirname, "app", "src", "images", "pin.PNG");
const yt = path.join(__dirname, "app", "src", "images", "yt.PNG");

const IMAGES_ROUTES = [
  {'/images/catto':catto}, 
  {'/images/fb':fb}, 
  {'/images/insta':insta}, 
  {'/images/logo':logo}, 
  {'/images/pin':pin}, 
  {'/images/yt': yt},
]

IMAGES_ROUTES.forEach((ROUTE) => {
  const [path, static_path] = Object.entries(ROUTE)[0]
  app.get(path, (req, res) => {
	fs.readFile(static_path, (err, data) => {
	  if (err) {
		res.status(500).send("Error reading image file");
	  } else {
		res.setHeader("Content-Type", "image/png");
		res.send(data);
	  }
	});  
  });
})

// ============= TODO REFACTOR ============= //

// require routes
require("./app/routes/card.routes.js")(app);
require("./app/routes/mailer.routes.js")(app);


const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

