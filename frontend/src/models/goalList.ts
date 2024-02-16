export interface GoalList {
  _id: string;
  title: string;
  desc?: string;
  style: string;
  goals: [Goal];
  createdAt: string;
  updatedAt: string;
}

export interface Goal {
  _id: string;
  text: string;
  sticker: number;
}
