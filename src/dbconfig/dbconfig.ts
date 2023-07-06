import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.on("Connected", () => {
      console.log(">>> DB is connected");
    });
    connection.on("error", () => {
      console.log(">>> DB is not connected");
      process.exit(1);
    });
  } catch (e) {
    console.log("Something goes wrong!");
    console.log(e);
  }
}
