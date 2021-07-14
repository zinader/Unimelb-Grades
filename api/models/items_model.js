import mongoose from "mongoose";

const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    subjectName: { type: String, required: true },
    subjectCode: { type: String, required: true },
    scores: { type: Array, required: true, default: [] },
    feedback: [
      {
        comment: { type: String, required: true },
        upvotes: { type: Number, required: true, default: 0 },
        report: { type: Boolean, default: false },
      },
    ],
    links: { type: Array, required: true, default: [] },
    wamBooster: { type: Number, required: true, default: 1 },
    scores_count: { type: Number, required: true, default: 1 },
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Item", itemSchema);

export default Item;
