import { v4 as uuid } from "uuid";
import { model, Schema } from "mongoose";
import { Response, Request } from "express";

interface user {
  username: string;
  id: string;
  password: string;
  image?: string;
}
const user_schema = new Schema<user>({
  username: { type: String, required: true },
  id: String,
  password: { type: String, required: true },
  image: String,
});

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
  public async Create(req: Request, res: Response) {
    console.log(req.body);
    return res.json({ teste: "teste" });
    // const { username, password } = req.body;
    // if (!username || !password) {
    //   return res.status(202).json({ error: "Sem credenciais!" });
    // }
    // const newUser = {
    //   username,
    //   password,
    //   id: uuid(),
    // };
    // await User.create(newUser);
    // return res.status(201).json({ message: "Criado com sucesso!" });
  }
  public async Update(req: Request, res: Response) {
    const ID = req.params.id;
    const { username, password, image } = req.body;
    const usuario = await User.findOne({ id: ID });
    if (usuario) {
      usuario.username = username || usuario.username;
      usuario.password = password || usuario.password;
      usuario.image = image || usuario.image || null;
      usuario.id = usuario.id;
      return res.json(usuario);
    } else {
      return res.status(404).json({ message: "Not FOund" });
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
