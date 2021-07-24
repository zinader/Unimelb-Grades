import express from "express";
const router = express.Router();

import {
  addScore,
  addLinks,
  upvoteComment,
  downvoteComment,
  addFeedback,
  reportComment,
  addWamBooster,
  getParticularItem,
  getAllItems,
  getWamBoosters,
  getTopItems,
} from "../controllers/items_controller.js";

// Update item scores

router.post("/", addScore);

// Add links

router.post("/addlinks", addLinks);

// Upvote Comment

router.post("/feedback/upvote/:upvotes", upvoteComment);

// Downvote Comment

router.post("/feedback/downvote/:upvotes", downvoteComment);

// Submit Feedback

router.post("/addfeedback", addFeedback);

// Report Comment

router.post("/feedback/report", reportComment);

// Mark an item as a wambooster

router.post("/addwambooster", addWamBooster);

// Get particular item scores

router.get("/item/:code", getParticularItem);

// Get all items sorted

router.get("/", getAllItems);

// Get all wamboosters

router.get("/wamboosters", getWamBoosters);

// Get top 60 items

router.get("/top", getTopItems);

export default router;
