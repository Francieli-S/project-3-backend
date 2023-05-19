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
    res.status(200).json("Get all Events");
  } catch (error) {
    console.log(error);
    // Catch Error status //
  }
});

router.get("/:eventId"),
  async (req, res, next) => {
    try {
      const oneEvent = await Event.find(req.params.eventId);
      res.status(200).json("Get one Event");
    } catch (error) {
      console.log(error);
      // Catch Error status //
    }
  };

router.post("/create"),
  async (req, res, next) => {
    try {
      const newEvent = await Event.create(req.body);
      res.status(201).json("Create an Event", newEvent);
    } catch (error) {
      console.log(error);
      // Catch Error status //
    }
  };

router.put("/:eventId", async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const payload = req.body;
    const updatedEvent = await Event.findByIdAndUpdate(eventId, payload, {
      new: true,
    });
    res.status(200).json("Update one Event", updatedEvent);
  } catch (error) {
    console.log(error);
    // Catch Error status //
  }
});

router.delete("/:eventId", async (req, res, next) => {
  try {
    const deleteEvent = await Event.findByIdAndDelete(req.params.eventId);
    res.status(200).json({ message: "Event successfully deleted" });
  } catch (error) {
    console.log(error);
    // Catch Error status //
  }
});
module.exports = router;
