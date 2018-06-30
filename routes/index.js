
var express = require("express");
const router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// ==================
// Middleware
// ==================
function isLoggedIn(req, res, next){
  if(req.isAuthenticated())
    return next();
  else
    res.redirect("/login");
}


// ==============
// Root Routes
// ==============
router.get("/",function(req,res){
  res.render("campgrounds/home");
});


// ================
// Auth Routes
// ================

router.get("/register", function(req, res){
  res.render("register");
});

router.post("/register", function(req, res){
  User.register(new User({username: req.body.username}), req.body.password, function(err, user){
    if(err){
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function(){
      res.redirect("/campgrounds");
    });
  });
});

// Show login form 
router.get("/login", function(req, res){
  res.render("login");
});

router.post("/login",passport.authenticate("local",
  {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
  }), function(req, res){
});

// logout
router.get("/logout", function(req, res){
  req.logout();
  res.redirect("/campgrounds");
});

module.exports  = router;