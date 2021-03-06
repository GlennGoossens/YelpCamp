var express = require("express");
var router = express.Router({
  mergeParams: true
});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//adding comment
router.get("/new", middleware.isLoggedIn, function (req, res) {
  Campground.findById(req.params.id, function (err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", {
        campground: campground
      });
    }
  });
});

router.post("/", middleware.isLoggedIn, function (req, res) {
  //loop up camground id
  Campground.findById(req.params.id, function (err, campground) {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      //create new comment
      Comment.create(req.body.comment, function (err, comment) {
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
          req.flash("success","Successfully added comment");
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });

});

router.get("/:comment_id/edit", middleware.checkCommentOwnership, function (req, res) {
  Comment.findById(req.params.comment_id, function (err, foundComment) {
    if (err) {
      res.redirect("back");
    } else {
      res.render("comments/edit", {
        campground_id: req.params.id,
        comment: foundComment
      });
    }
  });
});

router.put("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment) {
    if (err) {
      res.redirect("back");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

router.delete("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
  Comment.findByIdAndRemove(req.params.comment_id, function (err) {
    if (err) {
      req.flash("error","Comment could not be deleted");
      res.redirect("back");
    } else {
      re.flash("success","Comment deleted");
      res.redirect("back");
    }
  });
});

module.exports = router;