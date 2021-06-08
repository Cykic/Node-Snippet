const fs = require("fs");

fs.readFile("./index.js", (err, data) => {
  if (err) {
    return console.log(err);
  }
  //   console.log(data.toString());
});

// WRITE FILE

fs.writeFile("./tesdoc.txt", "Testing 123", (err) => {
  if (err) {
    return console.log(err);
  }
});

// DIRECTORIES

// fs.mkdir("./assets", (err) => {
//   if (err) {
//     return console.log(err.message.split(":").slice(1, 2).join());
//   }
//   console.log("folder created");
// });

// const readSream = fs.createReadStream("", { encoding: "utf8" });
// readSream.on("data", (chunk) => {
//   console.log("--------NEW CHUNK --------");
//   console.log(chunk);
// });
// const writeStream = fs.createWriteStream("",{encoding:"utf8"})

readSream.pipe(writeStream)
// 