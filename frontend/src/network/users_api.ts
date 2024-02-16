import { fetchData } from "../utils/fetchData";
import { USER_API } from "../utils/constants";
import { User } from "../models/user";

export const getLoggedInUser = async (): Promise<User> => {
  const response = await fetchData(USER_API, { method: "GET" });
  return response.json();
};

export interface RegisterCredentialsInterface {
  username: string;
  email: string;
  password: string;
}

export const register = async (
  credentials: RegisterCredentialsInterface
): Promise<User> => {
  const response = await fetchData(`${USER_API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return response.json();
};

export interface LoginCredentialsInterface {
  username: string;
  password: string;
}

export const login = async (
  credentials: LoginCredentialsInterface
): Promise<User> => {
  const response = await fetchData(`${USER_API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return response.json();
};

export const logout = async () => {
  await fetchData(`${USER_API}/logout`, { method: "POST" });
};
