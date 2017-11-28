var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

//campgrounds
router.get("/", function(req, res) {
  Campground.find({}, function(err, c) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", {campgrounds: c});
    }
  });
});

//Adding campground form
router.get("/new", isLoggedIn, function(req, res) {
  res.render("campgrounds/new");
});

//posting campground
router.post("/", isLoggedIn, function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var newCampground = {
    name: name,
    image: image,
    description: description,
    author: author
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
router.get("/:id", function(req, res) {
  Campground.findById(req.params.id).populate("comments").exec(function(err, found) {
    if (err) {
      console.log(err);
    } else {
      console.log(found);
      res.render("campgrounds/show", {campground: found});
    }
  });
});

//edit
router.get("/:id/edit", checkCampgroundOwnership, function(req, res) {
  Campground.findById(req.params.id, function(err, foundCampground) {
    res.render("campgrounds/edit", {campground: foundCampground});
  });
});

// update
router.put("/:id",checkCampgroundOwnership, function(req, res) {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCP) {
    if (err) {
      res.redirect("/");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

// destroy
router.delete("/:id",checkCampgroundOwnership, function(req, res) {
  Campground.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

function checkCampgroundOwnership(res, res, next) {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, function(err, foundCampground) {
      if (err) {
        res.redirect("back");
      } else {
        if (foundCampground.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect("back");
        }
      }
    });
  } else {
    res.redirect("back");
  }
}

module.exports = router;
