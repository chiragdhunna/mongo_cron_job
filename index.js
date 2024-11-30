import mongoose from "mongoose";
import cron from "node-cron";
import express from "express";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const mongoCron = async (url) => {
  await mongoose
    .connect(url)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });

  const db = mongoose.connection;
  db.on("error", (error) => {
    console.error("MongoDB connection error:", error);
  });
  db.once("open", () => {
    console.log("Connected to MongoDB");
  });
  db.on("disconnected", () => {
    console.log("Disconnected from MongoDB");
  });
};

const app = express();

cron.schedule("*/5 * * * * *", function () {
  console.log("running a task every 5 second");
  mongoCron(process.env.MONGO_GO_FOODS);
});

app.listen(process.env.PORT, () => {
  console.log("Server Started on PORT : " + process.env.PORT);
});
