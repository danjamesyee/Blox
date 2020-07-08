// //connect database to MongoDB Atlas
// module.exports = {
//   mongoURI:
//     //this string from Atlas setup
//     "mongodb+srv://admin:dH3QCKNC3lqQymGv@cluster0.fmbgo.mongodb.net/MERNblocks?retryWrites=true&w=majority",
//   //add key-value pair to our object to use jsonwebtoken
//   secretOrKey: "l4Hc8OxJM3",
// };
if (process.env.NODE_ENV === "production") {
  module.exports = require("./keys_prod");
} else {
  module.exports = require("./keys_dev");
}
