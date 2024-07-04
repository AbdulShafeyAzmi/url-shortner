import mongoose from "mongoose";

const connectToDb = async (url) => {
  await mongoose.connect(url);
  console.log("MongoDb connected...");
};

export { connectToDb };
