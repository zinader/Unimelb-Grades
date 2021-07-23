import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

// setup express
const app = express();
const port = process.env.PORT || 5000;

dotenv.config();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.status(200).send("Hi hello!"));

console.log("Starting Server");
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

import itemsRouter from "./routes/items.js";

app.use("/items", itemsRouter);

//setup mongoose
console.log("Connecting to MongoDB");

mongoose.connect(
  "mongodb+srv://cluster0.evqqp.mongodb.net/db1?retryWrites=true&w=majority",
  {
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.error(err);
    console.log("MongoDB connection established");
  }
);
