import express from "express";
import mongoose from "mongoose";
import { routes } from "./routes";
import morgan from "morgan";
import cors from "cors";
const app = express();
app.use(cors());
app.use(routes);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
mongoose
  .connect(
    "mongodb+srv://todoApp:yt5dK6v8HxayWhYo@cluster0.vqhys8t.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(4000, () => console.log("Server Rodando"));
  });
