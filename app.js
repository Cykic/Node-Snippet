const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

// express app
const app = express();

// Connect to mongoDB
const dbURI =
  "mongodb+srv://Cykic:Fortunatus@node-snippets.vcwve.mongodb.net/Node-Snippets?retryWrites=true&w=majority";

// object to prevent deprecation warning
const deprecationWarning = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(dbURI, deprecationWarning);

// register view engine
app.set("view engine", "ejs");

// Listen for request
app.listen(1234);

// makes static files available from our sever
app.use(express.static("public"));

// 3rd Party Middleware
app.use(morgan("dev"));
const blogs = [
  {
    title: "Yoshi find Eggs",
    snippet:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci, tempore nemo ratione eligendi magnam itaque totam sunt quam tenetur vel atque cupiditate fugit. Voluptatibus eveniet modi, cupiditate voluptas iusto deserunt.",
  },
  {
    title: "Mario Finds stars",
    snippet:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci, tempore nemo ratione eligendi magnam itaque totam sunt quam tenetur vel atque cupiditate fugit. Voluptatibus eveniet modi, cupiditate voluptas iusto deserunt.",
  },
  {
    title: "How to defeat bowser",
    snippet:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci, tempore nemo ratione eligendi magnam itaque totam sunt quam tenetur vel atque cupiditate fugit. Voluptatibus eveniet modi, cupiditate voluptas iusto deserunt.",
  },
];

//

// ROUTES

// HOME
app.get("/", (req, res) => {
  res.render("index", { title: "Home", blogs });
});

// ABOUT
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//
app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create Blog" });
});
// 404
app.use((_, res) => {
  res.status(404).render("404", { title: "404" });
});

// SNIPPETS

// REDIRECT
// app.get("/about", (req, res) => {
//   res.redirect("/about");
//   console.log("redirect");
//   res.sendFile("./views/about.html", { root: __dirname });
// });

// MIDDLEWARE FOR EVERY REQUEST
// app.use((req, res, next) => {
//   console.log("New request made:");
//   console.log("Host:", req.hostname);
//   console.log("Path:", req.path);
//   console.log("Method:", req.method);
//   next();
// });
