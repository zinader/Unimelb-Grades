import express from "express";
const router = express.Router();
import Subject from "../models/subjects_model.js";

// Update subject scores

router.route("/").post((req, res) => {
  Subject.findOneAndUpdate(
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

// Upvote Comment

router.route("/feedback/upvote/:upvotes").post((req, res) => {
  Subject.findOneAndUpdate(
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
  Subject.findOneAndUpdate(
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
  Subject.findOneAndUpdate(
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
  Subject.findOneAndUpdate(
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

// Get particular subject scores
router.route("/item/:code").get((req, res) => {
  Subject.find({
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

// Get all subjects sorted

router.route("/").get((req, res) => {
  Subject.find()
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

// Get top 20 subjects

router.route("/top").get((req, res) => {
  Subject.find()
    .limit(30)
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
