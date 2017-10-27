var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
  {
    name: "Salmon Creek",
    image: "http://www.photosforclass.com/download/2617191414",
    description: "This is Salmon Creek"
  }, {
    name: "Granite Hill",
    image: "http://www.photosforclass.com/download/2602356334",
    description: "This is Granite Hill"
  }, {
    name: "Mountain Goat",
    image: "http://www.photosforclass.com/download/6015893151",
    description: "This is Mountain Goat"
  }, {
    name: "Glenn Creek",
    image: "http://www.photosforclass.com/download/4369518024",
    description: "This is Glenn Creek"
  }, {
    name: "Yana Hill",
    image: "http://www.photosforclass.com/download/4684194306",
    description: "This is Yana Hill"
  }, {
    name: "Yanni Goat",
    image: "http://www.photosforclass.com/download/8524305204",
    description: "This is Yanni Goat"
  }, {
    name: "Jens Huts",
    image: "http://www.photosforclass.com/download/6037590541",
    description: "This is Jens Huts"
  }, {
    name: "Yosemite",
    image: "http://www.photosforclass.com/download/7121858075",
    description: "This is Yosemite"
  }, {
    name: "Sierra",
    image: "http://www.photosforclass.com/download/37433523451",
    description: "This is Sierra"
  }
]

function seedDB() {
  //remove all campgrounds
  Campground.remove({}, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Database cleared");
    }
    //Add campgrounds
    data.forEach(function(campground) {
      Campground.create(campground, function(err, camp) {
        if (err) {
          console.log(err);
        } else {
          console.log("Added a campground");
          //create a comments
          Comment.create({
            text: "This place is great, but I wish there was internet",
            author: "Homer"
          }, function(err, comment) {
            if (err) {
              console.log(err);
            } else {
              camp.comments.push(comment);
              camp.save();
              console.log("Created new comment");
            }
          });
        }
      });
    });
  });

  //Add comments
}

module.exports = seedDB;
