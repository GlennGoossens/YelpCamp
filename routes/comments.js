var express = require("express");
var router = express.Router({mergeParams:true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");

//adding comment
router.get("/new",isLoggedIn, function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", {campground: campground});
    }
  });
});

router.post("/",isLoggedIn, function(req, res) {
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
          //Add user to comments
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          //connect new comment to campgrounds
          comment.save();
          campground.comments.push(comment);
          campground.save();
          //redirect to show page of campground
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });

});

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
