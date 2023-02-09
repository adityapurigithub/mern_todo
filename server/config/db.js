import mongoose from "mongoose";

const db = async () => {
  await mongoose.connect(
    "mongodb+srv://aditya99:PA3F0Yl5O1ZLA1rA@cluster0.mcxgo6j.mongodb.net/?retryWrites=true&w=majority"
  );
  console.log("mongo_db connected");
};
export { db };
