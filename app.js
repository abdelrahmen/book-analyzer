const { default: axios } = require("axios");
const express = require("express");
const http = require("https");
const app = express();

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
