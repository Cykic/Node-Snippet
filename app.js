const express = require("express");

// express app
const app = express();

// register view engine
app.set('view engine','ejs')

// Listen for request

app.listen(9999);

// ROUTES

// HOME
app.get("/", (req, res) => {
//   res.sendFile("./views/index.html", { root: __dirname });
res.render('index')
console.log("home");
});

// ABOUT
app.get("/about", (req, res) => {
//   res.sendFile("./views/about.html", { root: __dirname });
    res.render('about')
  console.log("about");

});

// REDIRECT
app.get("/about", (req, res) => {
  res.redirect("/about");
  console.log("redirect");

});

// 404
app.use((_, res) => {
  res.status(404).sendFile("./views/404.html", { root: __dirname });
  console.log("404");

});
