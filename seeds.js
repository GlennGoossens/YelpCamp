var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
  {
    name: "Salmon Creek",
    image: "http://www.photosforclass.com/download/2617191414",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel ex interdum, rhoncus enim eget, dictum nibh. Etiam tincidunt dolor sed ultrices facilisis. Etiam pulvinar, sapien vel pellentesque auctor, turpis lorem pharetra nisl, eget mollis risus nisl at sem. Nulla laoreet elit sapien, nec maximus dolor laoreet malesuada. Donec ut nunc orci. Maecenas ac libero commodo, pretium magna nec, congue lectus. In eleifend mi libero, eget ornare enim condimentum vel. Pellentesque in nulla felis. Etiam sodales pulvinar diam, quis cursus erat rutrum eu. Nullam arcu lorem, pharetra nec ipsum quis, eleifend porttitor metus. Phasellus ut risus aliquet, tincidunt risus a, mattis tellus. Pellentesque urna urna, dictum et volutpat sollicitudin, ornare a turpis."

  }, {
    name: "Granite Hill",
    image: "http://www.photosforclass.com/download/2602356334",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel ex interdum, rhoncus enim eget, dictum nibh. Etiam tincidunt dolor sed ultrices facilisis. Etiam pulvinar, sapien vel pellentesque auctor, turpis lorem pharetra nisl, eget mollis risus nisl at sem. Nulla laoreet elit sapien, nec maximus dolor laoreet malesuada. Donec ut nunc orci. Maecenas ac libero commodo, pretium magna nec, congue lectus. In eleifend mi libero, eget ornare enim condimentum vel. Pellentesque in nulla felis. Etiam sodales pulvinar diam, quis cursus erat rutrum eu. Nullam arcu lorem, pharetra nec ipsum quis, eleifend porttitor metus. Phasellus ut risus aliquet, tincidunt risus a, mattis tellus. Pellentesque urna urna, dictum et volutpat sollicitudin, ornare a turpis."

  }, {
    name: "Mountain Goat",
    image: "http://www.photosforclass.com/download/6015893151",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel ex interdum, rhoncus enim eget, dictum nibh. Etiam tincidunt dolor sed ultrices facilisis. Etiam pulvinar, sapien vel pellentesque auctor, turpis lorem pharetra nisl, eget mollis risus nisl at sem. Nulla laoreet elit sapien, nec maximus dolor laoreet malesuada. Donec ut nunc orci. Maecenas ac libero commodo, pretium magna nec, congue lectus. In eleifend mi libero, eget ornare enim condimentum vel. Pellentesque in nulla felis. Etiam sodales pulvinar diam, quis cursus erat rutrum eu. Nullam arcu lorem, pharetra nec ipsum quis, eleifend porttitor metus. Phasellus ut risus aliquet, tincidunt risus a, mattis tellus. Pellentesque urna urna, dictum et volutpat sollicitudin, ornare a turpis."

  }, {
    name: "Glenn Creek",
    image: "http://www.photosforclass.com/download/4369518024",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel ex interdum, rhoncus enim eget, dictum nibh. Etiam tincidunt dolor sed ultrices facilisis. Etiam pulvinar, sapien vel pellentesque auctor, turpis lorem pharetra nisl, eget mollis risus nisl at sem. Nulla laoreet elit sapien, nec maximus dolor laoreet malesuada. Donec ut nunc orci. Maecenas ac libero commodo, pretium magna nec, congue lectus. In eleifend mi libero, eget ornare enim condimentum vel. Pellentesque in nulla felis. Etiam sodales pulvinar diam, quis cursus erat rutrum eu. Nullam arcu lorem, pharetra nec ipsum quis, eleifend porttitor metus. Phasellus ut risus aliquet, tincidunt risus a, mattis tellus. Pellentesque urna urna, dictum et volutpat sollicitudin, ornare a turpis."

  }, {
    name: "Yana Hill",
    image: "http://www.photosforclass.com/download/4684194306",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel ex interdum, rhoncus enim eget, dictum nibh. Etiam tincidunt dolor sed ultrices facilisis. Etiam pulvinar, sapien vel pellentesque auctor, turpis lorem pharetra nisl, eget mollis risus nisl at sem. Nulla laoreet elit sapien, nec maximus dolor laoreet malesuada. Donec ut nunc orci. Maecenas ac libero commodo, pretium magna nec, congue lectus. In eleifend mi libero, eget ornare enim condimentum vel. Pellentesque in nulla felis. Etiam sodales pulvinar diam, quis cursus erat rutrum eu. Nullam arcu lorem, pharetra nec ipsum quis, eleifend porttitor metus. Phasellus ut risus aliquet, tincidunt risus a, mattis tellus. Pellentesque urna urna, dictum et volutpat sollicitudin, ornare a turpis."

  }, {
    name: "Yanni Goat",
    image: "http://www.photosforclass.com/download/8524305204",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel ex interdum, rhoncus enim eget, dictum nibh. Etiam tincidunt dolor sed ultrices facilisis. Etiam pulvinar, sapien vel pellentesque auctor, turpis lorem pharetra nisl, eget mollis risus nisl at sem. Nulla laoreet elit sapien, nec maximus dolor laoreet malesuada. Donec ut nunc orci. Maecenas ac libero commodo, pretium magna nec, congue lectus. In eleifend mi libero, eget ornare enim condimentum vel. Pellentesque in nulla felis. Etiam sodales pulvinar diam, quis cursus erat rutrum eu. Nullam arcu lorem, pharetra nec ipsum quis, eleifend porttitor metus. Phasellus ut risus aliquet, tincidunt risus a, mattis tellus. Pellentesque urna urna, dictum et volutpat sollicitudin, ornare a turpis."

  }, {
    name: "Jens Huts",
    image: "http://www.photosforclass.com/download/6037590541",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel ex interdum, rhoncus enim eget, dictum nibh. Etiam tincidunt dolor sed ultrices facilisis. Etiam pulvinar, sapien vel pellentesque auctor, turpis lorem pharetra nisl, eget mollis risus nisl at sem. Nulla laoreet elit sapien, nec maximus dolor laoreet malesuada. Donec ut nunc orci. Maecenas ac libero commodo, pretium magna nec, congue lectus. In eleifend mi libero, eget ornare enim condimentum vel. Pellentesque in nulla felis. Etiam sodales pulvinar diam, quis cursus erat rutrum eu. Nullam arcu lorem, pharetra nec ipsum quis, eleifend porttitor metus. Phasellus ut risus aliquet, tincidunt risus a, mattis tellus. Pellentesque urna urna, dictum et volutpat sollicitudin, ornare a turpis."

  }, {
    name: "Yosemite",
    image: "http://www.photosforclass.com/download/7121858075",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel ex interdum, rhoncus enim eget, dictum nibh. Etiam tincidunt dolor sed ultrices facilisis. Etiam pulvinar, sapien vel pellentesque auctor, turpis lorem pharetra nisl, eget mollis risus nisl at sem. Nulla laoreet elit sapien, nec maximus dolor laoreet malesuada. Donec ut nunc orci. Maecenas ac libero commodo, pretium magna nec, congue lectus. In eleifend mi libero, eget ornare enim condimentum vel. Pellentesque in nulla felis. Etiam sodales pulvinar diam, quis cursus erat rutrum eu. Nullam arcu lorem, pharetra nec ipsum quis, eleifend porttitor metus. Phasellus ut risus aliquet, tincidunt risus a, mattis tellus. Pellentesque urna urna, dictum et volutpat sollicitudin, ornare a turpis."

  }, {
    name: "Sierra",
    image: "http://www.photosforclass.com/download/37433523451",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel ex interdum, rhoncus enim eget, dictum nibh. Etiam tincidunt dolor sed ultrices facilisis. Etiam pulvinar, sapien vel pellentesque auctor, turpis lorem pharetra nisl, eget mollis risus nisl at sem. Nulla laoreet elit sapien, nec maximus dolor laoreet malesuada. Donec ut nunc orci. Maecenas ac libero commodo, pretium magna nec, congue lectus. In eleifend mi libero, eget ornare enim condimentum vel. Pellentesque in nulla felis. Etiam sodales pulvinar diam, quis cursus erat rutrum eu. Nullam arcu lorem, pharetra nec ipsum quis, eleifend porttitor metus. Phasellus ut risus aliquet, tincidunt risus a, mattis tellus. Pellentesque urna urna, dictum et volutpat sollicitudin, ornare a turpis."

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
