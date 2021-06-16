const mongoose = require("mongoose");
const config = require("./config");

class MongoDB {
  isConnected = false;
  deprecationWarning = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }; // object to prevent deprecation warning

  constructor(username, password, database) {
    this.username = username;
    this.password = password;
    this.database = database;
    this.dbURL = `mongodb+srv://${this.username}:${this.password}@node-snippets.vcwve.mongodb.net/${this.database}?retryWrites=true&w=majority`;
  }

  async connectToMongoDB() {
    try {
      console.log("Connecting To MongoDB...");
      const result = await mongoose.connect(
        this.dbURL,
        this.deprecationWarning
      );
      this.dbresult = result;
      this.isConnected = true;
      console.log("Connected to MongoDB Successfully");
    } catch (err) {
      console.log("Failed to Connect to MongoDB");
      console.log("reason:", err.message);
    }
  }

  async startListening(app, port) {
    await this.connectToMongoDB();
    if (this.isConnected) {
      app.listen(port, () => {
        console.log("listening on Localhost", port);
      });
    }
  }
}

// Connect to mongoDB
module.exports = new MongoDB(config.username, config.password, config.database);
