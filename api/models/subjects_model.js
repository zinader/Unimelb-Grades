import mongoose from "mongoose";

const Schema = mongoose.Schema;

const subjectSchema = new Schema(
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
    wamBooster: { type: Number, default: 1 },
  },
  {
    timestamps: true,
  }
);

const Subject = mongoose.model("Subject", subjectSchema);

export default Subject;
