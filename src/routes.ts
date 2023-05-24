import { Router, Request, Response } from "express";
import UserControlLer from "./controllers/user";
import TodoController from "./controllers/todoData";
import bodyParser from "body-parser";
export const routes = Router();
// --------------- USER ----------------
const User = new UserControlLer();

routes.get("/user", bodyParser.json(), User.getAll);
routes.get("/user/:id", bodyParser.json(), User.getOne);
routes.get("/userbyname/:name", bodyParser.json(), User.getOneByName);
routes.post("/user", bodyParser.json(), User.Create);
routes.put("/user/:id", bodyParser.json(), User.Update);
routes.delete("/user/:id", bodyParser.json(), User.Delete);
// ---------------- TODO --------------------------
const Todo = new TodoController();
routes.get("/todo", bodyParser.json(), Todo.getAll);
routes.get("/todo/:id", bodyParser.json(), Todo.getOne);
routes.get("/todo/:name", bodyParser.json(), Todo.getOneByName);
routes.post("/todo", bodyParser.json(), Todo.Create);
routes.put("/todo/:id", bodyParser.json(), Todo.Update);
// routes.put("/todoautosave/:id",bodyParser.json(),)
routes.delete("/todo/:id", bodyParser.json(), Todo.Delete);
