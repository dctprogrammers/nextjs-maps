import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  //   If database is already connected, don't connect again
  if (connected) {
    console.log("MongoDB is connected");
    return;
  }

  //   Connect to MongoDB
  try {
    await mongoose.connect(
      "mongodb+srv://dctprogrammers:z0KJTNQ5ZMMOgD3W@cluster0.76lu2vq.mongodb.net/maps-db?retryWrites=true&w=majority&appName=Cluster0"
    );
    // await mongoose.connect(process.env.MONGODB_URI!);

    connected = true;
  } catch (error) {
    throw error;
  }
};

export default connectDB;
