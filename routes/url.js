const router = require("express").Router();
const Todo = require("../models/urlModel");
const axios = require("axios");
const cheerio = require("cheerio");
// routes
router
  .post("/add/todo", async (req, res) => {
    const { todo } = req.body;
    let response
    try {
     response = await axios.get(req.body.todo);
    } catch (error) {
      return res.status("url is not valide")
    }

    const html = response.data;
    const words = html.split(/\s+/);
    const wordCount = words.length;
    const $ = cheerio.load(html);
    let imageCount = $("img").length;
    const newUrl = new Todo({ todo, wordCount, imageCount });

    // save the todo
    newUrl
      .save()
      .then(() => {
        console.log("Successfully added url!");
        res.redirect("/");
      })
      .catch((err) => console.log(err,"Error"));
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

  .get("/imgcount/todo/:_id", (req, res) => {
    const { _id } = req.params;
    try {
      let Todo_edit = {};
      Todo.findOne({ _id }, function (err, product) {
        let url = product.todo;
        console.log(url, "url");
        axios
          .get(url)
          .then((response) => {
            const $ = cheerio.load(response.data);
            const imageCount = $("img").length;
            console.log(`The page at ${url} has ${imageCount} images.`);
            console.log(imageCount, "ooooo");
          })
          .catch((error) => console.error(`An error occurred: ${error}`));
      });
      console.log("Todo_edit", Todo_edit);
    } catch (error) {
      console.log(error);
    }
  })
  .post("/edit/todo/:id", function async(req, res) {
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
router.get("/count/todo/:_id", (req, res) => {
  const id = req.params._id;
  try {
    let Todo_edit = {};
    Todo.findOne({ id }, function (err, product) {
      let url = product.todo;
      console.log("product", url);
      axios
        .get(url)
        .then((response) => {
          const html = response.data;
          const words = html.split(/\s+/);
          const wordCount = words.length;
          console.log(`The page at ${url} has ${wordCount} words.`);
        })
        .catch((error) => console.error(`An error occurred: ${error}`));
    });
  } catch (error) {
    console.log(error);
  }
  res.render("index", { number: wordCount });
});

module.exports = router;
