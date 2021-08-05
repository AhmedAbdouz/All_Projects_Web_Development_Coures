const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const { stringify } = require("querystring");

const app = express();
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("puplic"));

mongoose.connect('mongodb://localhost:27017/wikiDB', { useNewUrlParser: true, useUnifiedTopology: true });

const artschema = { title: String, content: String };
const Article = mongoose.model("Article", artschema);



app.route("/articles")
    .get(function(req, res) {
        Article.find(function(err, result) {
            res.send(result);
        });
    })
    .post(function(req, res) {
        let newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });
        console.log(newArticle.title);
        newArticle.save(function(err) {
            res.send("successfully add new article");
        });
    })
    .delete(function(req, res) {
        Article.deleteMany(function(err) {
            if (!err)
                res.send("successfully deleted all records");
            else
                res.send(err);
        });
    });


app.route("/articles/:x")
    .get(function(req, res) {
        Article.findOne({ title: req.params.x }, function(err, result) {
            res.send(result);
        })
    })
    .put(function(req, res) {
        Article.update({ title: req.params.x }, { title: req.body.newtitle, content: req.body.content }, function(err, r) {
            res.send(r);
        });
    })
    .patch(function(req, res) {
        Article.update({ title: req.params.x }, { $set: req.body }, function(err) {
            res.send("successfully patced !!")
        });
    })
    .delete(function(req, res) {
        Article.findOneAndDelete({ title: req.params.x }, function(err) {
            res.send("successfully deleted !!");
        });
    });




app.listen(3000, function() {
    console.log("Server is running on the Kornish");
});