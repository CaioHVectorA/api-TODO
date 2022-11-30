import { Router, Request, Response } from "express";
import UserControlLer from "./controllers/user";
export const routes = Router();

// --------------- USER ----------------
const User = new UserControlLer();

routes.get("/user", User.getAll);
routes.get("/user/:id", User.getOne);
routes.post("/user", User.Create); // req.body saindo como undefined.
routes.put("/user/:id", User.Update);
routes.delete("/user/:id", User.Delete);
