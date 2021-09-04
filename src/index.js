const express = require("express");

const app = express();

app.get("/", (request, response) => {
  return response.json({
    message: 'Hello world Ignite!',
  });
});

app.listen(3333, () => console.log("⚙️  Api listening on port: 3333 ⚙️"));