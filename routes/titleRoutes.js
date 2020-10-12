module.exports = app => {
   const { getTitles } = require("../controllers/titleControllers");

   app.route("/I/want/title/?").get(getTitles);
}