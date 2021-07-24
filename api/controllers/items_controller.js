import Item from "../models/items_model.js";

// Add Score

export const addScore = (req, res) => {
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
};

// Add links

export const addLinks = (req, res) => {
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
};

// Upvote Comment

export const upvoteComment = (req, res) => {
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
};

// Downvote Comment

export const downvoteComment = (req, res) => {
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
};

// Submit Feedback

export const addFeedback = (req, res) => {
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
};

// Report Comment

export const reportComment = (req, res) => {
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
};

// Mark an item as a wambooster

export const addWamBooster = (req, res) => {
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
};

// Get particular item scores

export const getParticularItem = (req, res) => {
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
};

// Get all items in a sorted way

export const getAllItems = (req, res) => {
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
};

// Get all wamboosters

export const getWamBoosters = (req, res) => {
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
};

// Get top 60 items

export const getTopItems = (req, res) => {
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
};
