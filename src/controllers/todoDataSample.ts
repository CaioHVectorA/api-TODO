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
    const JSON_Recebido = req.body;
    console.log(req.body);
    if (!JSON_Recebido || typeof JSON_Recebido == "string") {
      return res.status(404).json({ error: "JSON NÃO RECEBIDO." });
    }
    await todoModel.create(JSON_Recebido);
    return res.status(201).json({ message: JSON_Recebido });
  }
}
export default SampleTodoController;
