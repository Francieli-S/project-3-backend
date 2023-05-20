const Comment = require("../models/Comment.model");
const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("Comment good in here");
});

router.get("/all-comments", async (req, res, next) => {
  try {
    const allComments = await Comment.find();
    res.status(200).json(allComments);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.post("/new-comment", async (req, res, next) => {
  try {
    const createComment = await Comment.create(req.body);
    res.status(201).json(createComment);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.put("/:commentId", async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const payload = req.body;
    const updatedComment = await Comment.findByIdAndUpdate(commentId, payload, {
      new: true,
    });
    res.status(200).json(updatedComment);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.delete("/:commentId", async (req, res, next) => {
  try {
    const deleteComment = await Comment.findByIdAndDelete(req.params.commentId);
    res.status(200).json({ message: "Comment successfully deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

module.exports = router;
