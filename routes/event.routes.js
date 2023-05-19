const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("Event good in here");
});

router.get("/all-events", (req, res, next) => {
  res.json("Get all Events");
});

router.get("/:eventId"),
  (req, res, next) => {
    res.json("Get one Event");
  };

router.post("/create"),
  (req, res, next) => {
    res.json("Create an Event");
  };

router.put("/:eventId", (req, res, next) => {
  res.json("Update one Event");
});

router.delete("/:eventId", (req, res, next) => {
  res.json("Delete one Event");
});
module.exports = router;
