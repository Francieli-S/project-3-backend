const router = require('express').Router();
const uploader = require('../middleware/cloudinary.config');
const User = require('../models/User.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');

router.get('/', (req, res, next) => {
  res.json('All good in here');
});

//Get to profile
router.get('/update', isAuthenticated, async (req, res, next) => {
  try {
    const { userId } = req.payload;
    const user = await User.findById({_id: userId});
    const {email, imageUrl} = user
    res.status(200).json({userName: email, imageUrl});
  } catch (error) {

    console.log(error);
  }
});

// PUT to profile
router.put(
  '/',
  isAuthenticated,
  uploader.single('imageUrl'),
  async (req, res, next) => {
    try {
      const { userId } = req.payload;
      const imageUrl = req.file.path;
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { imageUrl: imageUrl },
        {
          new: true,
        }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
);

module.exports = router;
