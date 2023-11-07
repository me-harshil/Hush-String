const mongoose = require("mongoose");

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return JSON.stringify("Already connected.");
  }
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Database connected");
  return JSON.stringify("Connected.");
};

export default connectDB;
