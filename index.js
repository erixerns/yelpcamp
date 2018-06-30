

var express = require("express"), 
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campgrounds"),
    seedDB = require("./seeds"),
    Comment = require("./models/comment"),
    passport = require("passport"),
    LocalStratergy = require("passport-local"),
    User = require("./models/user");

var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");

seedDB();


// ========
// Routes
// ========
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// Passport configuration
app.use(require("express-session")({
  secret: "Shibo wins the cutest dog!",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect("mongodb://localhost/yelpcamp");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

// middleware which runs for every single route
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});

app.set("view engine","ejs");





app.listen(80, function(){
  console.log("[!] Server has started: Port 80");
});