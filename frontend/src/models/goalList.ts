export interface GoalList {
  _id: string;
  title: string;
  desc?: string;
  style: string;
  goals?: [{ _id: string; text?: string; sticker?: number }];
  createdAt: string;
  updatedAt: string;
}
