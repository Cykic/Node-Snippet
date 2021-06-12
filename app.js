const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const BlogModel = require("./models/blog");
const MongoDB = require("./mongoDB");

// express app
const app = express();

// connect to MongoDB
(async function () {
  await MongoDB.connectToMongoDB();
  if (MongoDB.isConnected) {
    app.listen(8000, () => {
      console.log("listening on Localhost");
    });
  }
})();

// mongoose

// register view engine
app.set("view engine", "ejs");

// makes static files available from our sever
app.use(express.static("public"));
app.use(morgan("dev")); // 3rd Party Middleware
app.use(express.urlencoded({ extended: true })); //make form data un url to JSON

///////////////////////// PAGE ROUTES ////////////////////////

// HOME
app.get("/", (req, res) => {
  res.redirect("/blogs");
});
// ABOUT
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// ALL Blogs
app.get("/blogs", (req, res) => {
  BlogModel.find()
    .then((result) => {
      res.render("index", { title: "Home", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

// create new blog
app.post("/blogs", (req, res) => {
  const blog = new BlogModel(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
});

app.get('/blogs/:id', (req,res )=>{
    const id = req.params.id
    BlogModel.findById(id)
})
// CREATEBLOG

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create Blog" });
});
// 404 PAGE
app.use((_, res) => {
  res.status(404).render("404", { title: "404" });
});

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
////////////////////// SNIPPETS

// mongoose and mongo sandbox
// app.get("/add-blog", (req, res) => {
//   // Create new blog Document
//   const blog = new BlogModel({
//     title: "New Blog",
//     snippet: "About my new blog",
//     body: "More about my blog",
//   });

//   // Save to database
//   blog
//     .save()
//     .then((result) => {
//       res.send(result); //send result back
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// Single blog

// app.get("/single-blog", (req, res) => {
//   BlogModel.findById("60c36e69c05460048ba23f6e")
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => console.log(err));
// });

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
