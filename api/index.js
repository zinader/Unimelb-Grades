import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// setup express
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.status(200).send("Hi hello!"));

console.log("Starting Server");
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

import subjectsRouter from "./routes/subjects.js";

app.use("/subjects", subjectsRouter);

//setup mongoose
console.log("Connecting to MongoDB");

mongoose.connect(
  process.env.MONGO_URL || 'mongodb://localhost:27017/unimelb-grades',
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  (err) => {
    if (err) return console.error(err);
    console.log("MongoDB connection established");
  }
);
