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
    // await mongoose.connect(process.env.MONGODB_URI!);
    await mongoose.connect(
      "mongodb+srv://dctprogrammers:z0KJTNQ5ZMMOgD3W@cluster0.76lu2vq.mongodb.net/maps-db?retryWrites=true&w=majority&appName=Cluster0"
    );
    connected = true;
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
