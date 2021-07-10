import express from "express";
const router = express.Router();
import Item from "../models/items_model.js";

// Update item scores

router.route("/").post((req, res) => {
  Item.findOneAndUpdate(
    { subjectCode: req.body.subjectCode },
    { $push: { scores: req.body.score } },
    { new: true }
  )
    .then((result) =>
      res.json({
        success: true,
        data: result,
      })
    )
    .catch((err) =>
      res.json({
        success: false,
        error: err,
      })
    );
});

// Add links

router.route("/addlinks").post((req, res) => {
  Item.findOneAndUpdate(
    { subjectCode: req.body.subjectCode },
    { $push: { links: req.body.link } },
    { new: true }
  )
    .then((result) =>
      res.json({
        success: true,
        data: result,
      })
    )
    .catch((err) =>
      res.json({
        success: false,
        error: err,
      })
    );
});

// Upvote Comment

router.route("/feedback/upvote/:upvotes").post((req, res) => {
  Item.findOneAndUpdate(
    { subjectCode: req.body.subjectCode, "feedback._id": req.body.id },
    { $set: { "feedback.$.upvotes": Number(req.params.upvotes) + 1 } },
    { new: true }
  )
    .then((result) =>
      res.json({
        success: true,
        data: result,
      })
    )
    .catch((err) =>
      res.json({
        success: false,
        error: err,
      })
    );
});

// Downvote Comment

router.route("/feedback/downvote/:upvotes").post((req, res) => {
  Item.findOneAndUpdate(
    { subjectCode: req.body.subjectCode, "feedback._id": req.body.id },
    { $set: { "feedback.$.upvotes": Number(req.params.upvotes) - 1 } },
    { new: true }
  )
    .then((result) =>
      res.json({
        success: true,
        data: result,
      })
    )
    .catch((err) =>
      res.json({
        success: false,
        error: err,
      })
    );
});

// Submit Feedback

router.route("/addfeedback").post((req, res) => {
  Item.findOneAndUpdate(
    { subjectCode: req.body.subjectCode },
    { $push: { feedback: req.body.feedback } },
    { new: true }
  )
    .then((result) =>
      res.json({
        success: true,
        data: result,
      })
    )
    .catch((err) =>
      res.json({
        success: false,
        error: err,
      })
    );
});

// Report Comment

router.route("/feedback/report").post((req, res) => {
  Item.findOneAndUpdate(
    { subjectCode: req.body.subjectCode, "feedback._id": req.body.id },
    { $set: { "feedback.$.report": true } },
    { new: true }
  )
    .then((result) =>
      res.json({
        success: true,
        data: result,
      })
    )
    .catch((err) =>
      res.json({
        success: false,
        error: err,
      })
    );
});

// Mark an item as a wambooster

router.route("/addwambooster").post((req, res) => {
  Item.findOneAndUpdate(
    { subjectCode: req.body.subjectCode },
    { $inc: { wamBooster: 1 } }
  )
    .then((result) =>
      res.json({
        success: true,
        data: result,
      })
    )
    .catch((err) =>
      res.json({
        success: false,
        error: err,
      })
    );
});

// Get particular item scores
router.route("/item/:code").get((req, res) => {
  Item.find({
    subjectCode: req.params.code,
  })
    .then((result) =>
      res.json({
        success: true,
        data: result,
      })
    )
    .catch((err) =>
      res.json({
        success: false,
        error: err,
      })
    );
});

// Get all items sorted

router.route("/").get((req, res) => {
  Item.find()
    .sort({ scores: -1 })
    .then((result) =>
      res.json({
        success: true,
        data: result,
      })
    )
    .catch((err) =>
      res.json({
        success: false,
        error: err,
      })
    );
});

// Get all wamboosters

router.route("/wamboosters").get((req, res) => {
  Item.find({
    wamBooster: { $gt: 0 },
  })
    .sort({ wamBooster: -1 })
    .then((result) =>
      res.json({
        success: true,
        data: result,
      })
    )
    .catch((err) =>
      res.json({
        success: false,
        error: err,
      })
    );
});

// Get top 30 items

router.route("/top").get((req, res) => {
  Item.find()
    .limit(60)
    .sort({ scores: -1 })
    .then((result) =>
      res.json({
        success: true,
        data: result,
      })
    )
    .catch((err) =>
      res.json({
        success: false,
        error: err,
      })
    );
});

export default router;
