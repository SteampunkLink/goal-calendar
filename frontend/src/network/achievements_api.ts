import { fetchData } from "../utils/fetchData";
import { ACHIEVEMENT_API } from "../utils/constants";
import { Achievement } from "../models/achievement";

interface GetAchievementsMonthInterface {
  start: string;
  end: string;
}

interface GetAchievementsDayInterface {
  date: string;
}

export interface CreateAchievementInterface {
  goalText: string;
  stickerStyle: string;
  stickerNumber: number;
  dateAchieved: string;
}

export const getMonthsAchievements = async ({
  start,
  end,
}: GetAchievementsMonthInterface): Promise<Achievement[]> => {
  const monthsAchievements = await fetchData(
    `${ACHIEVEMENT_API}/month/${start}/${end}`
  );
  const achievementData = await monthsAchievements.json();
  return achievementData;
};

export const getDaysAchievements = async ({
  date,
}: GetAchievementsDayInterface): Promise<Achievement[]> => {
  const daysAchievements = await fetchData(`${ACHIEVEMENT_API}/day/${date}`);
  const achievementData = await daysAchievements.json();
  return achievementData;
};

export const createAchievement = async (
  newAchievement: CreateAchievementInterface
): Promise<Achievement> => {
  const response = await fetchData(ACHIEVEMENT_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newAchievement),
  });
  return response.json();
};

export const updateAchievement = async (
  achievementId: string,
  updatedAchievement: CreateAchievementInterface
): Promise<Achievement> => {
  const response = await fetchData(`${ACHIEVEMENT_API}/${achievementId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedAchievement),
  });
  return response.json();
};

export const deleteAchievement = async (achievementId: string) => {
  await fetchData(`${ACHIEVEMENT_API}/${achievementId}`, { method: "DELETE" });
};
