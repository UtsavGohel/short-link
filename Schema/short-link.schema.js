const mongoose = require("mongoose");
const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectId: {
      type: String,
      required: true,
    },

    visitHistory: [{ timestamp: { type: Number } }],
  },
  { timestamp: true }
);

const shortLink = mongoose.model("url", urlSchema);

module.exports = shortLink;
