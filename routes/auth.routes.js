const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const bcryptjs = require("bcryptjs");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const router = require("express").Router();
const uploader = require('../middleware/cloudinary.config')

const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/; // spec char, a capital, 8 characters long

router.get("/", (req, res, next) => {
  res.json("Auth good in here");
});

// POST to signup
router.post("/signup", async (req, res) => {
  const salt = bcryptjs.genSaltSync(13);
  console.log(req.body.email, req.body.password);
  const passwordHash = bcryptjs.hashSync(req.body.password, salt);
  try {
    const potentialUser = await User.findOne({ email: req.body.email });
    if (!potentialUser) {
      if (pwdRegex.test(req.body.password)) {
        await User.create({ email: req.body.email, password: passwordHash });
        res.status(201).json({ message: "New user created" });
      } else {
        // Password not strong enough
        res.status(401).json({ message: "Password not strong enough" });
        return;
      }
    } else {
      // Already a registered user
      res.status(402).json({ message: "Already a registered user" });
      return;
    }
  } catch (error) {
    //console.log(error);
    res.status(400).json(error);
  }
});

// POST to login
router.post("/login", async (req, res) => {
  const potentialUser = await User.findOne({ email: req.body.email });
  if (potentialUser) {
    if (bcryptjs.compareSync(req.body.password, potentialUser.password)) {
      const authToken = jwt.sign(
        { userId: potentialUser._id },
        process.env.TOKEN_SECRET,
        {
          algorithm: "HS256",
          expiresIn: "6h",
        }
      );
      res.json(authToken);
    } else {
      // Password is not correct
      res.status(401).json({ message: "Password is not correct" });
    }
  } else {
    // No user found
    res.status(402).json({ message: "No user found" });
  }
});

// GET to verify
router.get("/verify", isAuthenticated, async (req, res) => {
  const user = await User.findById(req.payload.userId);
  res.json({ message: "User is authenticated", user });
});

// PUT to profile
router.put("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const payload = req.body;
    const updatedUser = await User.findByIdAndUpdate(eventId, payload, {
      new: true,
    });
    res.status(200).json(updatedEvent);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

module.exports = router;
