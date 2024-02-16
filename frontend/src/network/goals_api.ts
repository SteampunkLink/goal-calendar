import { fetchData } from "../utils/fetchData";
import { GOAL_API } from "../utils/constants";
import { GoalList, Goal } from "../models/goalList";

export const fetchGoalLists = async (): Promise<GoalList[]> => {
  const goalResponse = await fetchData(GOAL_API, { method: "GET" });
  const goalData = await goalResponse.json();
  return goalData;
};

export interface GoalListInputInterface {
  title: string;
  desc?: string;
  style: string;
  goals?: [{ text?: string; sticker?: number }];
}

export const createGoalList = async (
  newGoalList: GoalListInputInterface
): Promise<GoalList> => {
  const response = await fetchData(GOAL_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newGoalList),
  });
  return response.json();
};

export const updateGoalList = async (
  goalListId: string,
  goalListInput: GoalListInputInterface
): Promise<GoalList> => {
  const response = await fetchData(`${GOAL_API}/${goalListId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(goalListInput),
  });
  return response.json();
};

export interface GoalInterface {
  text?: string;
  sticker?: number;
}

export const addGoalToList = async (
  goalListId: string,
  goal: string
): Promise<Goal[]> => {
  const response = await fetchData(`${GOAL_API}/addgoal/${goalListId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ goal }),
  });
  return response.json();
};

export const deleteGoalFromList = async (
  goalListId: string,
  goalId: string
): Promise<string> => {
  const response = await fetchData(`${GOAL_API}/removegoal/${goalListId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ goalId }),
  });
  const result = await response.json();
  return result.goalToDelete;
};

export const deleteGoalList = async (goalListId: string) => {
  await fetchData(`${GOAL_API}/${goalListId}`, { method: "DELETE" });
};
