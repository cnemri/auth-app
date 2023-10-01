import mongoose from "mongoose";

export async function connect() {
  try {
    // get
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });
    connection.on("error", (error) => {
      console.log("Something went wrong!");
      console.log(error);
    });
  } catch (error) {
    console.log("Something went wrong!");
    console.log(error);
  }
}
