const Event = require("../models/eventModel");

const getEvents = async (req, res) => {
  const events = await Event.find().lean();
  if (events) {
    res.status(200).json({
      message: "Events found",
      events,
    });
  } else {
    res.status(400).json({
      message: "Bad request",
    });
  }
};

const createEvent = async (req, res) => {
  const event = new Event(req.body);
  const response = await event.save();
  if (response) {
    res.status(200).json({
      message: "Event created",
      data: response,
    });
  } else {
    res.status(500).json({
      message: "Bad request",
    });
  }
};

const updateEvent = async (req, res) => {
  const response = await Event.findByIdAndUpdate(req.body._id, req.body, {
    new: true,
  }).lean();
  if (response) {
    res.status(200).json({
      message: "Event updated",
      data: response,
    });
  } else {
    res.status(400).json({
      message: "Bad request",
    });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
};
