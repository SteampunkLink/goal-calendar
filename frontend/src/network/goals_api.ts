import { GoalList } from "../models/goalList";

const fetchData = async (input: RequestInfo, init?: RequestInit) => {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMsg = errorBody.error;
    throw Error(errorMsg);
  }
};

export const fetchGoalLists = async (): Promise<GoalList[]> => {
  const goalResponse = await fetchData("/api/goals", { method: "GET" });
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
  const response = await fetchData("/api/goals", {
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
  const response = await fetchData(`/api/goals/${goalListId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(goalListInput),
  });
  return response.json();
};

export const deleteGoalList = async (goalListId: string) => {
  await fetchData(`/api/goals/${goalListId}`, { method: "DELETE" });
};
