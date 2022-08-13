const mongoose = require("mongoose");

const Event = mongoose.model(
  "Events",
  new mongoose.Schema(
    {
      start: { type: Date, default: Date.now, required: true },
      duration: { type: Number, required: true },
      title: String,
    },
    { versionKey: false }
  )
);

module.exports = Event;
