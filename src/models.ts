import { Schema } from "mongoose";

export interface user {
  username: string;
  id: string;
  password: string;
  image?: string;
}
export const user_schema = new Schema<user>({
  username: { type: String, required: true },
  id: String,
  password: { type: String, required: true },
  image: String,
});

export interface todoList {
  Icon: any;
  IconString: string;
  Name: string;
  Ref: number;
  Todos: any;
  colorText: string;
  estilo: object;
  id: String;
  Users: String[];
}

export const todoList_schema = new Schema<todoList>({
  IconString: String,
  Name: { type: String, required: true },
  Ref: { type: Number, required: true },
  Todos: { type: Array, required: true },
  colorText: String,
  estilo: Object,
  id: String,
  Users: Array,
});

export interface todoListSampleInterface {
  key: any;
  todoKey: any;
  value: any;
}

export const todoListSample_Schema = new Schema<todoListSampleInterface>({
  key: String,
  todoKey: String,
  value: String,
});
