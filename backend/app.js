 const express = require('express');
 const bodyParser = require("body-parser");
 const mongoose = require("mongoose");

 const Post = require("./models/post");

 const app = express();

 mongoose.connect("mongodb+srv://chakshu_19:nCqZ6z80REahpAPk@cluster0-mieew.mongodb.net/node-angular?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true})
 .then(() => {
   console.log("connected to database")
 })
 .catch(() => {
   console.log("connection failed ")
 });

 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended: false}));

 app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
 });

 app.post("/api/posts",(req, res, next) => {
   const post = new Post({
     title: req.body.title,
     content: req.body.content
   });

   post.save().then(result => {
    res.status(201).json({
      message: "successfully added",
      postId: createdPost._id
      });
   });
 });

 app.get('/api/posts', (req, res, next) => {
  Post.find()
    .then(documents => {
      res.status(200).json({
        message: "posts fetched successfully",
        posts: documents
    });
  });
 });

 app.delete("/api/posts/:id", (req, res, next) => {
   Post.deleteOne({_id: req.params.id}).then(result =>{
     console.log(result);
     res.status(200).json({message: "deleted successfully"});
   });
 });

 module.exports = app;
