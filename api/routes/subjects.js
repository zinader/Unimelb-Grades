import express from "express";
const router = express.Router();
import Subject from "../models/subjects_model.js";

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
