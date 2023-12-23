const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var path = require('path');
// const routes = require("../Routes/post")

const PORT = 3000

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb+srv://Du4rte:1234@cluster0.ridtqjz.mongodb.net/blog_database", {useNewUrlParser: true}, {useUnifiedTopology: true})

//create data scheme
const noteScheme = {
    title:String,
    content:String
}

function goHome(){
    window.location.replace("http://127.0.0.1:5500/public/Templates/index.html")
}
function post(){
    window.location.replace("http://127.0.0.1:5500/public/Templates/post.html")
}

function signin(){
    window.location.replace("http://127.0.0.1:5500/public/Templates/entry.html")
}

function login(){
    window.location.replace("http://127.0.0.1:5500/public/Templates/entry.html")
}

function editProfile(){
    window.location.replace("http://127.0.0.1:5500/public/Templates/entry.html")
}

const Post = mongoose.model("Posts", noteScheme);

app.get("/post", (req,res) => {
   res.sendFile(path.resolve('public/Templates/post.html'));
})

app.post("/", (req,res) =>{
    let newPost = new Post({
        title: req.body.title,
        content: req.body.content
    })
    newPost.save();
    // res.redirect("/");
})

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})

app.use(express.static('public'))