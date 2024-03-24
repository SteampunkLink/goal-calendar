import { useEffect, useState } from "react";
import { Category } from "../models/category";
import * as CategoriesApi from "../network/categories_api";
import Goals from "./goals/Goals";
import AchievementForm from "./calendar/AchievementForm";
import { Achievement } from "../models/achievement";
import utilStyles from "../styles/Utils.module.css";

interface LoadGoalsProps {
  directTo: string;
  setNewAchievement: null | ((achievement: Achievement) => void);
  selectedDate: Date | null;
}

const LoadGoals = ({
  directTo,
  setNewAchievement,
  selectedDate,
}: LoadGoalsProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [goalsLoading, setGoalsLoading] = useState(true);
  const [goalsError, setGoalsError] = useState("");

  useEffect(() => {
    const loadGoals = async () => {
      try {
        setGoalsError("");
        setGoalsLoading(true);
        const goalData = await CategoriesApi.fetchCategories();
        setCategories(goalData);
      } catch (error) {
        setGoalsError(
          "Couldn't load categories. Please reload the page or try again later."
        );
      } finally {
        setGoalsLoading(false);
      }
    };
    loadGoals();
  }, []);

  const handleSetCategories = (updatedCategories: Category[]) => {
    setCategories(updatedCategories);
  };

  return (
    <>
      {goalsError && <div className={utilStyles.errorBox}>{goalsError}</div>}
      {directTo === "goals" && (
        <Goals
          categories={categories}
          goalsLoading={goalsLoading}
          setCategories={handleSetCategories}
        />
      )}
      {directTo === "achievement" && (
        <AchievementForm
          categories={categories}
          goalsLoading={goalsLoading}
          addNewAchievement={setNewAchievement!}
          selectedDate={selectedDate!}
        />
      )}
    </>
  );
};

export default LoadGoals;
