var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
/*
var User = require("./models/user");
*/
var seedDB = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

app.get("/", function(req, res) {
  res.render("landing");

});

app.get("/campgrounds", function(req, res) {
  Campground.find({}, function(err, c) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", {campgrounds: c})
    }
  });
});

app.get("/campgrounds/new", function(req, res) {
  res.render("new");
});

app.post("/campgrounds", function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var newCampground = {
    name: name,
    image: image,
    description: description
  };
  Campground.create(newCampground, function(err, c) {
    if (err) {
      console.log(err);
    } else {
      console.log("succesfully created");
      res.redirect("/campgrounds");
    }
  });
});

app.get("/campgrounds/:id", function(req, res) {
  Campground.findById(req.params.id).populate("comments").exec(function(err, found) {
    if (err) {
      console.log(err);
    } else {
      console.log(found);
      res.render("show", {campground: found});
    }
  });
});

app.listen(3000, function(req, res) {
  console.log("server is started and running on port 3000");
});
