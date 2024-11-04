import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "RhythmExchange",
    });

    console.log("MongoDb Connected");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error.message);
    console.log(error);
  }
};

export default connectDb;
