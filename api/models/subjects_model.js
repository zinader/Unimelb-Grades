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
        rating: { type: Number, min: 0, max: 5, required: true },
        report: { type: Boolean, default: false },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Subject = mongoose.model("Subject", subjectSchema);

export default Subject;
