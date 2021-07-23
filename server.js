// DEPENDENCIES
const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT | 3000;

// Initialize Express
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// ROUTES
require("./routes/api")(app);
require("./routes/html")(app);
 
// Start the server
app.listen(PORT, function () {
  console.log("Listening on PORT " + PORT);
});