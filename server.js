
const express = require('express')
const dotenv =require('dotenv').config()
const mongoose=require('mongoose')
const cors = require('cors');


const axios = require('axios');

const todoRoute=require('./routes/todoRoute')
const app=express()

mongoose.connect('mongodb://127.0.0.1:27017/todo');

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("MongoDB connection is successful");
});

connection.on("error", (error) => {
  console.log("Error in MongoDB connection", error);
});

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(cors());
// routes
app.use(require("./routes/todoRoute"))
app.use(require("./routes/todo"))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.listen(3000,(req,res)=>{
  // res.setHeader("Access-Control-Allow-Origin", "*");
    console.log('server listening on port 3000');
})