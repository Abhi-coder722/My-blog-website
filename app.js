//jshint esversion:6
var posts=[];
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
// Targeting the home route and in the function 
app.get("/", function (req, res) {//redirecting to home route
  res.render('home', { 
    StartingContent: homeStartingContent,
  posts:posts
  });//to render the home page

})
app.get("/about", function (req, res) {//redirecting to the about page
  res.render('about', { AboutContent: aboutContent });//to render the home page
})
app.get("/contact", function (req, res) {//redirecting to the contact page
  res.render('contact', { contactContent: contactContent });//to render the home page
})
app.get("/compose",function(req,res){
  res.render("compose");
})
app.post("/compose",function(req,res){
  
  var item=req.body.postTitle;
  // we are gonna update it
  const post={
    title: req.body.postTitle,
    post: req.body.Text1
  };
  posts.push(post);
  res.redirect("/");
})

// expressing the route parameters for /posts and get the name entered by the user stored in the variable called postName
app.get("/posts/:postName", function(req,res){
  var requestedTitle=req.params.postName;
  requestedTitle=_.lowerCase(requestedTitle);
  requestedTitle = _.kebabCase(requestedTitle);
  posts.forEach(function(post){
    var storedTitle= post.title;
    storedTitle=_.lowerCase(storedTitle);
    storedTitle = _.kebabCase(storedTitle);


    if(storedTitle === requestedTitle){
      res.render("post", { 
        title: post.title,
        content : post.post
      });//to render the post page
    }
  });
})

// using rs on our terminal while running app.js using nodemon will restart the nodemon app.js and clear the virtual changes made to the application 







app.listen(3000, function () {
  console.log("Server started on port 3000");
});
