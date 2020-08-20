const worldData = require("./worldWatch/index");
const app = require("express")();
app.all("/worldData", worldData["world-data-watch"]);
app.listen(3002, () => {
  console.log(`Example app listening at http://localhost:${3002}`);
});
