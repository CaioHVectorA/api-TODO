import mongoose from "mongoose";
import { v4 as uuid } from "uuid";
import { model } from "mongoose";
import { Request, Response } from "express";
import { todoListSample_Schema, todoListSampleInterface } from "../models";

const todoModel = model<todoListSampleInterface>(
  "todoSample",
  todoListSample_Schema
);

class SampleTodoController {
  public async getAll(req: Request, res: Response) {
    const db = [];
    const todos = await todoModel.find();
    todos.forEach((item) => {
      if (!db.includes(item)) {
        db.push(item);
      }
    });
    return res.json(db);
  }
  public async getByTodoId(req: Request, res: Response) {
    const ID = req.params.id;
    const todoFound = await todoModel.findOne({ todoKey: ID });
    if (todoFound) {
      return res.json(todoFound);
    } else {
      return res.status(404).json({ error: "Todo não encontrado!" });
    }
  }
  public async getByUserId(req: Request, res: Response) {
    const ID = req.params.id;
    const db = [];
    const todoFounds = await todoModel.find();
    todoFounds.forEach((item) => {
      if (!db.includes(item)) {
        db.push(item);
      }
    });
    return res.json(db);
  }
  public async Create(req: Request, res: Response) {
    // request example:
    // {
    //   User: USER
    //   JSON: JSON,
    // }
    const { User, Data } = req.body;
    console.log(User, Data);
    if (!Data || !User) {
      return res.status(404).json({ error: "Dados Insuficientes" });
    }
    const newTodo = await todoModel.create({
      key: User,
      todoKey: uuid(),
      value: Data
    });
    return res.json(newTodo);
  }
}
export default SampleTodoController;
