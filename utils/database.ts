import mongoose from "mongoose";

let isConnected = false;

export async function connectToDB() {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_DB_URI!, {
      dbName: "todo-app",
    });

    isConnected = true;

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
}
