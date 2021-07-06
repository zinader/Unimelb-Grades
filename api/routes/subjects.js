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
    .limit(20)
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
