var express = require('express');
var formidable = require('express-formidable');
var fs = require('fs');
var app = express();

// uses the static folder
app.use(express.static('public'));

// includes formidable
app.use(formidable());

//displays past posts
var displayPosts = app.get("/get-posts", function (req, res) {
    res.sendFile(__dirname + '/data/posts.json');
});

// function for the post method (when the send button is pressed)
app.post("/create-post", function (req, res) {
    var yourData = req.fields;
    //console.log(JSON.stringify(yourData));
    var currentDate = Date.now();
    //need to combine currentDate and grab only the value for yourData into the json format
    var blogContent = yourData.blogpost;
    fs.readFile(__dirname + '/data/posts.json', function (error, file) {
        var currentBlogPosts = JSON.parse(file);
        //console.log("current blog posts: " + currentBlogPosts);
        currentBlogPosts[currentDate] = blogContent;
        var updatedBlogPosts = JSON.stringify(currentBlogPosts);
        //console.log(updatedBlogPosts);
        fs.writeFile(__dirname + '/data/posts.json', updatedBlogPosts, function (error) {
            console.log("written to posts.json!");
        });
    });
    //writes to a file. Takes the location you want to write to, the data to write, and the callback function
});

// set up server to listen on port 3000, and specifies function to run when it's running
app.listen(3000, function () {
    console.log("Server is listening on port 3000. Ready to accept requests!");
});


// info and instructions: https://node-girls.gitbook.io/intro-to-express/intro-to-backend-development-with-node.js/tutorial/step-10-displaying-your-blog-posts