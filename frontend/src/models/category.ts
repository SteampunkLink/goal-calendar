import { Goal } from "./goal";

export interface Category {
  _id: string;
  title: string;
  style: string;
  createdAt: string;
  updatedAt: string;
  goals: [Goal];
}
