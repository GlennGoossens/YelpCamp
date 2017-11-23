var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");

var seedDB = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

//PASSPORT configure
app.use(require("express-session")({
  secret: "Rusty is the best",
  resave:false,
  saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  next();
});

//HOME
app.get("/", function(req, res) {
  res.render("landing");

});

//campgrounds
app.get("/campgrounds", function(req, res) {
  Campground.find({}, function(err, c) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", {campgrounds: c});
    }
  });
});

//Adding campground form
app.get("/campgrounds/new", function(req, res) {
  res.render("campgrounds/new");
});

//posting campground
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

//details of campground
app.get("/campgrounds/:id", function(req, res) {
  Campground.findById(req.params.id).populate("comments").exec(function(err, found) {
    if (err) {
      console.log(err);
    } else {
      console.log(found);
      res.render("campgrounds/show", {campground: found});
    }
  });
});

/*
==================COMMENTS ROUTES=====================
*/
//adding comment form
app.get("/campgrounds/:id/comments/new",isLoggedIn, function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", {campground: campground});
    }
  });
});

app.post("/campgrounds/:id/comments",isLoggedIn, function(req, res) {
  //loop up camground id
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      //create new comment
      Comment.create(req.body.comment, function(err, comment) {
        if (err) {
          console.log(err);
        } else {
          //connect new comment to campgrounds
          campground.comments.push(comment);
          campground.save();
          //redirect to show page of campground
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });

});

//AUTH
//show register form
app.get("/register",function(req,res){
  res.render("register");
});

//post register form
app.post("/register",function(req,res){
  User.register(new User({username: req.body.username}),req.body.password,function(err,user){
    if(err){
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req,res,function(){
      res.redirect("/campgrounds");
    });
  });
});

//Show login form
app.get("/login",function(req,res){
  res.render("login");
});

app.post("/login",passport.authenticate("local",{
  successRedirect:"/campgrounds",
  failureRedirect:"/login"
}),function(req,res){
});

//logout
app.get("/logout",function(req,res){
  res.logout();
  res.redirect("/campgrounds");
});

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

app.listen(3000, function(req, res) {
  console.log("server is started and running on port 3000");
});
