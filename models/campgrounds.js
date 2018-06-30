
var mongoose=require("mongoose")
var campgroundSchema= new mongoose.Schema({
  name: String,
  image: String,
  comments:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }]
});

// This adds a new collection in the database
module.exports = mongoose.model("Campground",campgroundSchema);