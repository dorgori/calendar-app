const express = require("express");
const eventController = require("../controllers/eventController");
const router = express.Router();

router.get("/", async (req, res) => {
  eventController.getEvents(req, res);
});

router.post("/", async (req, res) => {
  eventController.createEvent(req, res);
});

router.put("/", async (req, res) => {
  eventController.updateEvent(req, res);
});

module.exports = router;
