const Event = require("../models/Event.model");
const router = require("express").Router();

router.get("/", (req, res, next) => {
  try {
    res.json("Event good in here");
  } catch (error) {
    console.log(error);
  }
});

router.get("/all-events", async (req, res, next) => {
  try {
    const allEvents = await Event.find();
    res.status(200).json(allEvents);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.get("/:eventId", async (req, res, next) => {
  try {
    const oneEvent = await Event.find(req.params.eventId);
    res.status(200).json("Get one Event");
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.post("/create", async (req, res, next) => {
  try {
    const newEvent = await Event.create(req.body);
    res.status(201).json(newEvent);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.put("/:eventId", async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const payload = req.body;
    const updatedEvent = await Event.findByIdAndUpdate(eventId, payload, {
      new: true,
    });
    res.status(200).json(updatedEvent);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.delete("/:eventId", async (req, res, next) => {
  try {
    const deleteEvent = await Event.findByIdAndDelete(req.params.eventId);
    res.status(200).json({ message: "Event successfully deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});
module.exports = router;
