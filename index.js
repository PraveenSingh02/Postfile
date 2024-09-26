const express = require("express");
const app = express();
const port= 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");


app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));


// const multer = require('multer');

// // Set up storage for images
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/uploads/'); // Directory where images will be stored
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${uuidv4()}-${file.originalname}`); // Unique filename
//     }
// });

// const upload = multer({ storage });


let posts = [
    {
        id : uuidv4(),
        username : "apnacollege",
        content : "I love coding",
        //image: "download1.jpeg"
    },
    {
        id : uuidv4(),
        username : "pksingh",
        content : "Smart work is important to achieve success",
        //image: "download1.jpeg"
    },
    {
        id : uuidv4(),
        username : "pk",
        content : "Hard work is important to achieve success"
    },
];


app.get("/posts",(req, res)=>{
    res.render("index.ejs", {posts});
});

app.get("/posts/new",(req, res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req, res)=>{
    let {username, content}= req.body;
    let id = uuidv4();
    
    posts.push({id, username, content});
    res.redirect("/posts");
    // res.send("post request working");
});

app.get("/posts/:id",(req, res)=>{
    let {id}= req.params;
    let post = posts.find((p)=> id ===p.id);
    res.render("show.ejs",{post});
    // res.send("request working");
});

app.patch("/posts/:id",(req, res)=>{
    let {id} = req.params;
    let newContent =req.body.content;
    let post = posts.find((p)=> id ===p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
   // res.send("patch request working");
    
});

// app.get("/posts/:id/edit",(req, res)=>{
//     let { id } = req.params;
//     let post = posts.find((p) => id === p.id);
//     res.render("edit.ejs", {post});
// });
app.get("/posts/:id/edit",(req, res)=>{
    let {id}= req.params;
    let post = posts.find((p)=> id ===p.id);
    res.render("edit.ejs", {post});

});

app.delete("/posts/:id",(req, res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=> id !== p.id);
    res.redirect("/posts");
    // res.send("delete success");

})


app.listen(port,(req,res)=>{
    console.log("litening to the port: 8080 hello");
 
});