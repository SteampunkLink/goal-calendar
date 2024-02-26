import { fetchData } from "../utils/fetchData";
import { CATEGORY_API } from "../utils/constants";
import { Category } from "../models/category";

export interface CategoryInputInterface {
  title: string;
  style: string;
  goals?: [{ text?: string; sticker?: number }];
}

export const fetchCategories = async (): Promise<Category[]> => {
  const goalResponse = await fetchData(CATEGORY_API, { method: "GET" });
  const goalData = await goalResponse.json();
  return goalData;
};

export const createCategory = async (
  newCategory: CategoryInputInterface
): Promise<Category> => {
  const response = await fetchData(CATEGORY_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newCategory),
  });
  return response.json();
};

export const updateCategory = async (
  categoryId: string,
  categoryInput: CategoryInputInterface
): Promise<Category> => {
  const response = await fetchData(`${CATEGORY_API}/${categoryId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(categoryInput),
  });
  return response.json();
};

export const deleteCategory = async (categoryId: string) => {
  await fetchData(`${CATEGORY_API}/${categoryId}`, { method: "DELETE" });
};
