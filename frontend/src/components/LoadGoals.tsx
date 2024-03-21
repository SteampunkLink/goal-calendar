import { useEffect, useState } from "react";
import { Category } from "../models/category";
import * as CategoriesApi from "../network/categories_api";
import Goals from "./goals/Goals";
import AchievementForm from "./calendar/AchievementForm";
import { Achievement } from "../models/achievement";

interface LoadGoalsProps {
  directTo: string;
  setNewAchievement: (achievement: Achievement) => void;
}

const LoadGoals = ({ directTo, setNewAchievement }: LoadGoalsProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [goalsLoading, setGoalsLoading] = useState(true);
  const [showGoalsError, setShowGoalsError] = useState(false);

  useEffect(() => {
    const loadGoals = async () => {
      try {
        setShowGoalsError(false);
        setGoalsLoading(true);
        const goalData = await CategoriesApi.fetchCategories();
        setCategories(goalData);
      } catch (error) {
        setShowGoalsError(true);
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
      {directTo === "goals" && (
        <Goals
          categories={categories}
          goalsLoading={goalsLoading}
          showGoalsError={showGoalsError}
          setCategories={handleSetCategories}
        />
      )}
      {directTo === "achievement" && (
        <AchievementForm
          categories={categories}
          goalsLoading={goalsLoading}
          showGoalsError={showGoalsError}
          addNewAchievement={setNewAchievement}
        />
      )}
    </>
  );
};

export default LoadGoals;
