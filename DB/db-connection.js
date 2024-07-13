const mongoose = require("mongoose");

const DBconnection = (URL) => {
  return mongoose.connect(URL);
};

module.exports = DBconnection;
