var Campground = require("../models/campgrounds");
var express=require("express");
const router = express.Router();

// ==================
// Middleware
// ==================
function isLoggedIn(req, res, next){
  if(req.isAuthenticated())
    return next();
  else
    res.redirect("/login");
}

// ===================
// Campgrounds Routes
// ===================
router.get("/",function(req,res){
  // Get all campgrounds from database
  Campground.find({},function(err,campgrounds){
    if(err)
      console.log("[!} Error: "+err);
    else{
      res.render("campgrounds/campgrounds",{campgrounds:campgrounds});
    }
  });
});

router.post("/",function(req,res){
  var name=req.body.name;
  var image=req.body.image;

  var newCamp = {name:name, image:image};
  Campground.create(newCamp,function(err,campground){
    if(err)
      console.log(err);
    else
      res.redirect("/campgrounds");
  });
});

router.get("/new",function(req,res){
  res.render("campgrounds/new");
});

router.get("/:id",function(req, res){
  Campground.findById(req.params.id).populate("comments").exec(function(err, campground){
    if(err)
      console.log(err);
    else
      res.render("/show", {campground: campground});
  });
});


module.exports = router;