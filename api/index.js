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
