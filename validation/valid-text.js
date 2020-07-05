//custom function used to check whether a given string consists of valid input
const validText = (str) => {
  return typeof str === "string" && str.trim().length > 0;
};

module.exports = validText;
