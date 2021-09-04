const express = require("express");

const app = express();

/**
 * GET - search some data into server.
 * POST - Insert some data into server.
 * PUT - Change some data into server.
 * PATCH - Change some specific data into server.
 * DELETE - delete some data from server.
 */

let listOfCourses = ["course 1", "course 2", "course 3"];

app.get("/courses", (request, response) => {
  return response.json(listOfCourses);
});

app.post("/courses", (request, response) => {
  // Add a new course into array, just returning a new course for example
  return response.json([...listOfCourses, "course 4"]);
});

app.put("/courses/:id", (request, response) => {
  const { id } = request.params;

  let listOfCourses = ["course 1", "course 2", "course 3", "course 4"];

  // Static change for example
  listOfCourses[id] = "course 6";

  return response.json(listOfCourses);
});

app.patch("/courses/:id", (request, response) => {
  const { id } = request.params;

  // Static change for example
  listOfCourses[id] = "course 6";

  return response.json(listOfCourses);
});

app.delete("/courses/:index", (request, response) => {
  const { index: indexParam } = request.params;

  // Removing the course in a specific index by id
  const filteredListOfCourses = listOfCourses.filter(
    (_,index) => index !== indexParam
  );

  return response.json(filteredListOfCourses);
});

app.listen(3333, () => console.log("⚙️  Api listening on port: 3333 ⚙️"));
