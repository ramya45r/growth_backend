const router = require("express").Router();
const Todo = require("../models/todo");
const axios = require("axios");
const cheerio = require("cheerio");
// routes
router
  .post("/add/todo", (req, res) => {
    const { todo } = req.body;
    const newTodo = new Todo({ todo });

    // save the todo
    newTodo
      .save()
      .then(() => {
        console.log("Successfully added todo!");
        res.redirect("/");
      })
      .catch((err) => console.log(err));
  })

  .get("/delete/todo/:_id", (req, res) => {
    const { _id } = req.params;
    Todo.deleteOne({ _id })
      .then(() => {
        console.log("Deleted Todo Successfully!");
        res.redirect("/");
      })
      .catch((err) => console.log(err));
  })

  .get("/count/todo/:_id", (req, res) => {
    const { _id } = req.params;
    
    try {
      let Todo_edit = {};
      Todo.findOne({ _id }, function (err, product) {
        let url = product.todo;
        console.log("productttttt", url);
        axios
          .get(url)
          .then((response) => {
            const html = response.data;
            const words = html.split(/\s+/);
            const wordCount = words.length;
            console.log(`The page at ${url} has ${wordCount} words.`);
            return wordCount;
   
            
          })
          .catch((error) => console.error(`An error occurred: ${error}`));
      });
    } catch (error) {
      console.log(error);
    }
  })


  .get("/imgcount/todo/:_id", (req, res) => {
    const { _id } = req.params;
    console.log(_id, "8888888");
    try {
      let Todo_edit = {};
      Todo.findOne({ _id }, function (err, product) {
        let url = product.todo;
        console.log("productttttt", url);

        axios
          .get(url)
          .then((response) => {
            const $ = cheerio.load(response.data);
            const imageCount = $("img").length;
            console.log(`The page at ${url} has ${imageCount} images.`);
           
            res.render("index", { count: imageCount });
          })
          .catch((error) => console.error(`An error occurred: ${error}`));
      });
      console.log("Todo_edit", Todo_edit);
    } catch (error) {
      console.log(error);
    }
  })
  // .post("/edit/todo/:_id",(req, res) => {

  //   const { _id } = req.params;
  //   console.log(_id);
  //   try {
  //    let Todo_edit ={}
  //      Todo.findOne({ _id }, function(err, product) {
  //       res.send(product)
  //       console.log("product",product);
  //       Todo_edit = product
  //     });
  //     console.log("Todo_edit",Todo_edit)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // })
  .post("/edit/todo/:id", function (req, res) {
    console.log(req.params);
    Todo.findOneAndUpdate(
      { _id: req.params.id },
      { todo: req.body.todo },
      function (err, todo) {
        if (err) {
          console.log(err);
        } else {
          res.redirect("/");
        }
      }
    );
  });

module.exports = router;
