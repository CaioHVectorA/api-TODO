import { v4 as uuid } from "uuid";
import { model } from "mongoose";
import { Response, Request } from "express";
import { user, user_schema } from "../models";

const User = model<user>("User", user_schema);

class UserController {
  public async getAll(req: Request, res: Response) {
    const db = [];
    const allUsers = await User.find();
    allUsers.forEach((item) => {
      if (!db.includes(item)) {
        db.push(item);
      }
    });
    return res.json(db);
  }
  public async getOne(req: Request, res: Response) {
    const ID = req.params.id;
    const userFound = await User.findOne({ id: ID });
    if (userFound) {
      return res.json(userFound);
    } else {
      return res.status(404).json({ message: "Not Found" });
    }
  }
  public async getOneByName(req: Request, res: Response) {
    const name = req.params.name;
    const userFound = await User.findOne({ username: name });
    if (userFound) {
      return res.json(userFound);
    } else {
      return res.status(404).json({ message: "Usuário Não encontrado!" });
    }
  }
  public async Create(req: Request, res: Response) {
    const { username, password } = req.body;
    const userExists = await User.findOne({ username: username });
    console.log(userExists);
    console.log(username, password);
    if (userExists) {
      return res
        .status(401)
        .json({ error: "Já existe um usuário com esse nome!" });
    }
    console.log(req.body);
    if (!username || !password) {
      return res.status(202).json({ error: "Sem credenciais!" });
    }
    const newUser = {
      username,
      password,
      id: uuid(),
    };
    await User.create(newUser);
    return res.status(201).json({ message: "Criado com sucesso!" });
  }
  public async Update(req: Request, res: Response) {
    const ID = req.params.id;
    console.log(ID);
    const { username, password, image } = req.body;
    console.log(username, password);
    const usuario = await User.findOne({ id: ID });
    if (usuario) {
      usuario.username = username || usuario.username;
      usuario.password = password || usuario.password;
      usuario.image = image || usuario.image || null;
      usuario.id = usuario.id;
      const updatedUser = await User.findOneAndUpdate({ id: ID }, usuario);
      return res.json(updatedUser);
    } else {
      return res.status(404).json({ message: "Not Found" });
    }
  }
  public async Delete(req: Request, res: Response) {
    const ID = req.params.id;
    const userDeleted = await User.deleteOne({ id: ID });
    if (userDeleted) {
      return res.json(userDeleted);
    } else {
      return res.status(404).json({ message: "Not FOund" });
    }
  }
}
export default UserController;
