import { Goal } from "../models/goals";
import { GoalCategory } from "../models/goalCategories";

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

export const fetchGoals = async (): Promise<{
  goals: Goal[];
  categories: GoalCategory[];
}> => {
  const goalResponse = await fetchData("/api/goals", { method: "GET" });
  const categoryResponse = await fetchData("/api/goalcategories", {
    method: "GET",
  });
  const goalsData = await goalResponse.json();
  const categoryData = await categoryResponse.json();
  return {
    goals: goalsData.goals,
    categories: categoryData.categories,
  };
};

export interface GoalCategoryInput {
  title: string;
  style: number;
}

export const createGoalCategory = async (
  newGoalCategory: GoalCategoryInput
): Promise<GoalCategory> => {
  const response = await fetchData("/api/goalcategories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newGoalCategory),
  });
  return response.json();
};
