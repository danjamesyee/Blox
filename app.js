const mongoose = require("mongoose");

//import your key
const db = require("./config/keys").mongoURI;

//create new express server
const express = require("express");
const app = express();

//import routes
const users = require("./routes/api/users");
const tracks = require("./routes/api/tracks");
const blocks = require("./routes/api/blocks");

//body parser lets us parse JSON we send to frontend
const bodyParser = require("body-parser");

//Passport authenticates our token and constructs private routes
const passport = require("passport");

//middleware for passport
app.use(passport.initialize());
//setup config file for Passport
require("./config/passport")(passport);

//setup some middleware for body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//connect to MongoDB using Mongoose
mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

//tell Express to you route
app.use("/api/users", users);
app.use("/api/tracks", tracks);
app.use("/api/blocks", blocks);

//tell our app which port to run on, heroku requires process.env.PORT.
//our server will now run on localhost:5000
const port = process.env.PORT || 5000;

//tell Express to start a socket and listen for connections on the path
//also logs a success message to the console when server is running sucessfully
app.listen(port, () => console.log(`Server is running on port ${port}`));

//importing path from Express
const path = require("path");
//loading the static build if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}
