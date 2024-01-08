const express = require("express");
const route = express.Router();
const Blog = require("../models/blog.js")

route.get("/blogs",(req,res)=>{
    Blog.find({})
    .then((result)=>res.render("blogs",{title:"All Blogs",blogs:result}))
    .catch(err=>console.log(err))
})

route.post("/blogs",(req,res)=>{
    const blog = new Blog(req.body)
    .save()
    .then(()=>{res.redirect("/blogs")})
    .catch((err)=>console.log(err));
});

route.get("/blogs/:id",(req,res)=>{
    Blog.findById(req.params.id)
    .then(result=>{
        res.render("single_blog",{title:result.title,blog:result})
    })
    .catch(err=>console.log(err));
});

route.delete("/blogs/delete-all",(req,res)=>{
    const id = req.params.id;
    Blog.deleteMany({})
    .then(result=>res.json({redirect:"/blogs"}))
    .catch(err=>console.log(err));
});

route.delete("/blogs/:id",(req,res)=>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then(result=>res.json({redirect:"/blogs"}))
    .catch(err=>console.log(err));
});

module.exports = route;