// DEPENDENCIES
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const DB_STRING = process.env.DB_STRING;

// Initialize Express
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

mongoose.connect(
    DB_STRING,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
    function(err){
        if (!err) {
      console.log("db connected")
        } else {
            console.log(err);
        }
    }
  );

// ROUTES
require("./routes/api")(app);
require("./routes/html")(app);
 
// Start the server
app.listen(PORT, function () {
  console.log("Listening on PORT " + PORT);
});
