const { isAuthenticated } = require("../middleware/jwt.middleware");
const Event = require("../models/Event.model");
const User = require("../models/User.model");
const router = require("express").Router();

router.get("/", (req, res, next) => {
  try {
    res.json("Event good in here");
  } catch (error) {
    console.log(error);
  }
});

router.get("/all-events", async (req, res, next) => {
  const { search, blues, rock, folk } = req.query;
  try {
    let filter = {};
    if (search) {
      filter = { title: { $regex: search, $options: "i" } };
    }
    if (blues) {
      filter.genre = { $in: "blues" };
    }
    if (rock) {
      filter.genre = { $in: "rock" };
    }
    if (folk) {
      filter.genre = { $in: "folk" };
    }
    console.log(filter);
    const allEvents = await Event.find(filter);
    res.status(200).json(allEvents);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.get("/all-events/my-events", isAuthenticated, async (req, res, next) => {
  const { search, blues, rock, folk } = req.query;
  try {
    let filter = {};
    if (search) {
      filter = { title: { $regex: search, $options: "i" } };
    }
    if (blues) {
      filter.genre = { $in: "blues" };
    }
    if (rock) {
      filter.genre = { $in: "rock" };
    }
    if (folk) {
      filter.genre = { $in: "folk" };
    }
    const user = req.payload.userId;
    console.log("user id!!", user);
    const myEvents = await Event.find({ createdBy: user });
    //allEvents.map((event) => {...event, isEditable: isOwnedByCurrentUser})
    res.status(200).json(myEvents);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.get("/:eventId", async (req, res, next) => {
  try {
    const oneEvent = await Event.findById(req.params.eventId);
    res.status(200).json(oneEvent);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.post("/create", isAuthenticated, async (req, res, next) => {
  try {
    //console.log("event body", req.config.headers.authorization);
    const newEvent = await Event.create({
      ...req.body,
      createdBy: req.payload.userId,
    });
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
