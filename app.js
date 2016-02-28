var express = require("express");
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var dataRoute = require('./routes/data');
var pg = require('pg');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/data', dataRoute);

app.get("/jq", function(req,res,next){
    res.sendFile(path.join(__dirname, "./public/views/index.html"));
});

app.get("/*", function(req,res,next){
    var file = req.params[0] || "views/index.html";
    res.sendFile(path.join(__dirname, "./public/", file))
});

app.set("port", process.env.PORT || 5000);
app.listen(app.get("port"), function(req,res,next){
    console.log("Listening on port: " + app.get("port"));
});

module.exports = app;
