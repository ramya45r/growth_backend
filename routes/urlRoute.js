const router = require("express").Router();
const URL = require("../models/urlModel");
const axios = require("axios");
const cheerio = require("cheerio");

// routes will be here....
router.get("/", async (req, res) => {
  
  const allTodo = await URL.find();
  // const words = html.split(/\s+/);
  //   const wordCount = words.length;
  // for(let i=0; i<allTodo.length; i++){
    
    // try {
    //   const response = await axios.get(allTodo[i].todo)
    //   const html = response.data
    //   const words = html.split(/\s+/);
    //   const wordCount = {wordCount:words.length}
    //   const $ = cheerio.load(html);
    //   let imageCount = {imageCount:$("img").length};
    //   // console.log(imageCount,"tester")
    //   allTodo[i] = await {...allTodo,...wordCount,...imageCount}
    //   // console.log(allTodo,"allTodo after push")
    // } catch (error) {
    //   console.log(error,"Error");
    // }
  // }
  // console.log(allTodo[0],"finalize")
  console.log(allTodo)
  res.render("index", { todo: allTodo});
});


module.exports = router;
