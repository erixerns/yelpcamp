/* jshint esversion: 6*/
var Campground = require("../models/campgrounds");
var Comment = require("../models/comment");
var express = require("express");
const router = express.Router({mergeParams: true});

// ==================
// Middleware
// ==================
function isLoggedIn(req, res, next){
  if(req.isAuthenticated())
    return next();
  else
    res.redirect("/login");
}

// ================
// Comments routes
// ================

router.get("/new",isLoggedIn, function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if(err)
      console.log(err);
    else{
      res.render("comments/new",{campground: campground});
    }
  });
});

router.post("/",isLoggedIn, function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
      res.redirect("/campgrounds/"+req.params.id);
    }
    else{
      Comment.create(req.body.comment, function(err, comment){
        comment.author.is = req.user._id;
        comment.author.username=req.user.username();
        comment.save();
        campground.comments.push(comment);
        campground.save();

        res.redirect("/campgrounds/"+req.params.id);
      });
    }
  });
});


module.exports = router;