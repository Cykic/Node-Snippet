const http = require("http");
const fs = require("fs");
const _ = require("lodash");

const server = http.createServer((req, res) => {
  // LODASH
  // const num = _.random(0, 20);
  // console.log(num);

  // const greet =_.once(()=>{
  //   console.log("Hello");
  // })

  greet();
  greet();
  let path = "./views/";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    default:
      path += "404.html";
      res.statusCode = 404;
      break;
  }

  // Sending Response
  //   res.write("Hello, Ninja");
  //   res.end();
  res.setHeader("Content-Type", "text/html");

  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      return res.end();
    }
    res.end(data);
  });
});

server.listen("3002", "localhost", () => {
  console.log("Listening for request on port 3000");
});
