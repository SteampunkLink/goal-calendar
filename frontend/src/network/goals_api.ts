import { fetchData } from "../utils/fetchData";
import { GOAL_API } from "../utils/constants";
import { Goal } from "../models/goal";

export interface NewGoalInputInterface {
  goalText: string;
}

export const createGoal = async (
  categoryId: string,
  goalText: string
): Promise<Goal> => {
  const response = await fetchData(`${GOAL_API}/${categoryId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ goalText }),
  });
  return response.json();
};

export const updateSticker = async (
  categoryId: string,
  goalId: string,
  newSticker: number
): Promise<Goal[]> => {
  const response = await fetchData(`${GOAL_API}/${goalId}/${categoryId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ newSticker }),
  });
  return response.json();
};

export const deleteGoal = async (categoryId: string, goalId: string) => {
  await fetchData(`${GOAL_API}/${goalId}/${categoryId}`, {
    method: "DELETE",
  });
};
