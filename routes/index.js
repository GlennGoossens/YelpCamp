var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//HOME
router.get("/", function (req, res) {
  res.render("landing");

});


//AUTH
//show register form
router.get("/register", function (req, res) {
  res.render("register");
});

//post register form
router.post("/register", function (req, res) {
  User.register(new User({
    username: req.body.username
  }), req.body.password, function (err, user) {
    if (err) {
      req.flash("error",err);
      return res.redirect("register");
    }
    passport.authenticate("local")(req, res, function () {
      req.flash("success","You have been registered successfully, Welcome " + user.username + "!");
      res.redirect("/campgrounds");
    });
  });
});

//Show login form
router.get("/login", function (req, res) {
  res.render("login");
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/campgrounds",
  failureRedirect: "/login"
}), function (req, res) {});

//logout
router.get("/logout", function (req, res) {
  req.logout();
  req.flash("success","Logged you out!")
  res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;