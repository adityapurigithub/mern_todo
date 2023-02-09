import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

app.get("/", (req, res) => {
  res.send("hi");
});

app.listen(port, (err) => {
  if (err) {
    return console.warn(`Error in setting up server @->${err}`);
  }
  console.log(`Server Up on PORT-> http://localhost:5000`);
});
