import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import user from "./routes/userAPI.js";

import todo from "./routes/todoAPI.js";

import bodyParser from "body-parser";
import { db } from "./config/db.js";

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

await db();

app.get("/", (req, res) => {
  res.send("hi");
});

app.use("/user", user);

app.use("/todo", todo);

app.listen(port, (err) => {
  if (err) {
    return console.warn(`Error in setting up server @->${err}`);
  }
  console.log(`Server Up on PORT-> http://localhost:5000`);
});
