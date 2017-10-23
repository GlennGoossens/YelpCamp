var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

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

app.get("/",function(req,res){
  res.render("landing");

});

app.get("/campgrounds",function(req,res){

  res.render("campgrounds",{campgrounds:campgrounds});
});

app.get("/campgrounds/new",function(req,res){
  res.render("new");
});

app.post("/campgrounds",function(req,res){
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name : name,image : image};
  campgrounds.push(newCampground);
  res.redirect("/campgrounds");
});

app.listen(3000,function(req,res) {
  console.log("server is started and running on port 3000");
});
