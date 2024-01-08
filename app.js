const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.set("view engine","ejs");
app.use(express.static("assets"));
const blogRoute = require("./routes/blogRoutes.js")

const Blog = require("./models/blog.js")

//const dbURI = [PASTE YOUR CONNECTION STRING HERE]

mongoose.connect(dbURI)
    .then((result)=>{app.listen(3000)})
    .catch((err)=>{console.log(err)});

app.use(express.urlencoded({extended:true}));

app.use( (req,res,next)=> {
    console.log("\n ---NEW REQUEST---")
    console.log("host: ",req.hostname);
    console.log("method: ",req.method);
    console.log("url: ",req.url);
    console.log("path: ",req.path);
    next()
});

app.use(blogRoute);

app.get("/",(req,res)=>{
    res.redirect("/blogs")
})

app.get("/create-blog",(req,res)=>{
    res.render("create",{title:"Create Blog"});
})

app.get("/about",(req,res)=>{
    res.render("about",{title:"About"});
})

app.use((req,res)=>{
    res.status(404).render("404",{title:"Error Page"})
})