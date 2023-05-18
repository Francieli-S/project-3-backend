const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const bcryptjs = require("bcryptjs");
const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("Auth good in here");
});

// POST to signup
router.post("/signup", async (req, res) => {
  const salt = bcryptjs.genSaltSync(13);
  console.log(req.body.email, req.body.password);
  const passwordHash = bcryptjs.hashSync(req.body.password, salt);
  try {
    await User.create({ email: req.body.email, password: passwordHash });
    res.status(201).json({ message: "New user created" });
  } catch (error) {
    console.log(error);
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
    }
  } else {
    // No user found
  }
});

// GET to verify

module.exports = router;
