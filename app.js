const { default: axios } = require("axios");
const express = require("express");
const http = require("https");
const app = express();

app.get("/", (req, res) => {
  res.send(
    "<h1>Usage:</h1> <br/><h2>https://book-analyzer.abdelrahmen1.repl.co/[your-isbn-number-here]</h2>"
  );
});
app.get("/:isbn", (req, res) => {
  http.get(
    `https://openlibrary.org/isbn/${req.params.isbn}.json`,
    (response) => {
      axios
        .get(response.headers.location)
        .then((value) => {
          res.json(value.data);
        })
        .catch((e) => {
          res.json(e);
        });
    }
  );
});

app.listen(3000);
