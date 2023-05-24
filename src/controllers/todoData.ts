import mongoose from "mongoose";
import { v4 as uuid } from "uuid";
import { model } from "mongoose";
import { Request, Response } from "express";
import { todoList, todoList_schema } from "../models";

const todoList = model<todoList>("Todo", todoList_schema);
class TodoController {
  // GetAll, GetOne, Post(Create), PUT, edit, delete?
  // ADIONAR REF DO PLAYER.
  public async getAll(req: Request, res: Response) {
    const db = [];
    const todos = await todoList.find();
    todos.forEach((item) => {
      if (!db.includes(item)) {
        db.push(item);
      }
    });
    return res.json(db);
  }
  public async getOne(req: Request, res: Response) {
    const ID = req.params.id;
    const todoFound = await todoList.findOne({ id: ID });
    if (todoFound) {
      return res.json(todoFound);
    } else {
      return res.status(404).json({ error: "Todo não encontrado!" });
    }
  }
  public async getOneByName(req: Request, res: Response) {
    const name = req.params.name;
    const todoFound = await todoList.findOne({ Name: name });
    if (todoFound) {
      return res.json(todoFound);
    } else {
      return res.status(404).json({ error: "Todo não encontrado!" });
    }
  }
  public async Create(req: Request, res: Response) {
    const { Name, Icon, IconString, Ref, Todos, colorText, estilo } = req.body;
    const newTodo = {
      Name,
      Icon: Icon || null,
      IconString,
      Ref,
      Todos,
      colorText,
      estilo,
      id: uuid,
    };
    await todoList.create(newTodo);
    return res.status(201).json({ message: "Criado com sucesso!" });
  }

  public async Update(req: Request, res: Response) {
    const ID = req.params.id;
    const { Name, IconString, Ref, Todos, colorText, estilo } = req.body; // o icon só funfa no web
    const todolist = await todoList.find({ id: ID });
    if (todolist) {
      const newTodo = {
        Name,
        IconString,
        Ref,
        Todos,
        colorText,
        estilo,
      };
      const updatedTodo = await todoList.findOneAndUpdate({ id: ID });
      return res.json(updatedTodo);
    } else {
      return res.status(404).json({ error: "Todo não encontrado!" });
    }
  }
  public async Delete(req: Request, res: Response) {
    const ID = req.params.id;
    const deletedTodo = await todoList.deleteOne({ id: ID });
    if (deletedTodo) {
      return res.status(200).json({ message: "Deletado Com Sucesso!" });
    } else {
      return res.status(404).json({ error: "Todo não encontrado!" });
    }
  }
  // public async AutoSave(req: Request, res: Response) {
  //   const ID = req.params.id;
  //   let AutoSaveRequest
  // }
}

export default TodoController;
