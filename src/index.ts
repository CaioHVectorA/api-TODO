import express from "express";
import mongoose from "mongoose";
import { routes } from "./routes";
import cors from 'cors'
const app = express();
app.use(routes);
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});
app.use(cors())
mongoose
  .connect(
    "mongodb+srv://todoApp:yt5dK6v8HxayWhYo@cluster0.vqhys8t.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(8889, () => console.log("Server Rodando"));
  });
