//connect database to MongoDB Atlas
module.exports = {
  mongoURI:
    //this string from Atlas setup
    "mongodb+srv://admin:dH3QCKNC3lqQymGv@cluster0.fmbgo.mongodb.net/MERNblocks?retryWrites=true&w=majority",

  //add key-value pair to our object to use jsonwebtoken
  secretOrKey: "l4Hc8OxJM3",
};