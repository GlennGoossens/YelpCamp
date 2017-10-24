var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp",{useMongoClient:true});

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

var campgroundSchema = new mongoose.Schema({
  name: String,
  image:String,
  description:String
});

var Campground = mongoose.model("Campground",campgroundSchema);

/*
Campground.create({name:"Mountain Goat",image:"http://www.photosforclass.com/download/6015893151",description:"This is a huge mountain with goats. no bathrooms and water"},function(err,campground){
  if(err){
    console.log(err);
  }else{
    console.log("campground has been created");
    console.log(campground);
  }
});
*/

/*
var campgrounds = [
  {name:"Salmon Creek",image:"http://www.photosforclass.com/download/2617191414"},
  {name:"Granite Hill",image:"http://www.photosforclass.com/download/2602356334"},
  {name:"Mountain Goat",image:"http://www.photosforclass.com/download/6015893151"},
  {name:"Salmon Creek",image:"http://www.photosforclass.com/download/2617191414"},
  {name:"Granite Hill",image:"http://www.photosforclass.com/download/2602356334"},
  {name:"Mountain Goat",image:"http://www.photosforclass.com/download/6015893151"},
  {name:"Salmon Creek",image:"http://www.photosforclass.com/download/2617191414"},
  {name:"Granite Hill",image:"http://www.photosforclass.com/download/2602356334"},
  {name:"Mountain Goat",image:"http://www.photosforclass.com/download/6015893151"}
];
*/

app.get("/",function(req,res){
  res.render("landing");

});

app.get("/campgrounds",function(req,res){
  Campground.find({},function(err,c){
    if(err){
      console.log(err);
    }else{
      res.render("index",{campgrounds:c})
    }
  });

//  res.render("campgrounds",{campgrounds:campgrounds});
});

app.get("/campgrounds/new",function(req,res){
  res.render("new");
});

app.post("/campgrounds",function(req,res){
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var newCampground = {name : name,image : image,description:description};
  Campground.create(newCampground,function(err,c){
    if(err){
      console.log(err);
    }else{
      console.log("succesfully created");
      res.redirect("/campgrounds");
    }
  });
  //campgrounds.push(newCampground);
//  res.redirect("/campgrounds");
});

app.get("/campgrounds/:id",function(req,res){
  Campground.findById(req.params.id,function(err,found){
    if(err){
      console.log(err);
    }else{
      res.render("show",{campground:found});
    }
  });
});

app.listen(3000,function(req,res) {
  console.log("server is started and running on port 3000");
});
