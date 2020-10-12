const express = require("express");
const path = require("path");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const titleRoutes = require("./routes/titleRoutes");
titleRoutes(app);
app.get("*", (req, res) => {
  res.status(404).send("Error 404 : PAGE NOT FOUND");
});
 
//Server Connection
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));
