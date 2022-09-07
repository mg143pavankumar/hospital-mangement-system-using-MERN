import mongoose from "mongoose";

export const connectToDatabase = () => {
  mongoose.connect(process.env.MONGODB_URI).then((data) => {
    console.log("Mongodb is connected: " + data.connection.host);
  });
};
