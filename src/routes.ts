import { Router, Request, Response } from "express";
import UserControlLer from "./controllers/user";
import bodyParser from "body-parser";
export const routes = Router();
// --------------- USER ----------------
const User = new UserControlLer();

routes.get("/user",bodyParser.json(), User.getAll);
routes.get("/user/:id",bodyParser.json(), User.getOne);
routes.post("/user",bodyParser.json(), User.Create); // req.body saindo como undefined.
routes.put("/user/:id",bodyParser.json(), User.Update);
routes.delete("/user/:id",bodyParser.json(), User.Delete);
