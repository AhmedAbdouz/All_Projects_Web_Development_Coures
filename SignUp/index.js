const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const { urlencoded } = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }))
const app = express();
app.use(express.static("public"));

app.use(urlencoded({ extended: true }));

app.listen(3000, function() {
    console.log("Server is running on port 3000 .....!");
});

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});