import { useState } from "react";
import { FaStar, FaSpinner } from "react-icons/fa";
import { Form } from "react-bootstrap";
import { Category } from "../../models/category";
import { Goal } from "../../models/goal";
import * as AchievementApi from "../../network/achievements_api";
import { Achievement } from "../../models/achievement";
import utilStyles from "../../styles/Utils.module.css";

interface AchievementFormProps {
  categories: Category[];
  goalsLoading: boolean;
  addNewAchievement: (achievement: Achievement) => void;
  selectedDate: Date;
}

const AchievementForm = ({
  categories,
  goalsLoading,
  addNewAchievement,
  selectedDate,
}: AchievementFormProps) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  const selectACategory = (e: any) => {
    const categoryToSelect = categories.find(
      (cat) => cat._id === e.target.value
    );
    if (categoryToSelect) {
      setSelectedCategory(categoryToSelect);
    } else {
      setSelectedCategory(null);
    }
  };

  const selectAGoal = (e: any) => {
    const goalToSelect = selectedCategory?.goals.find(
      (goal) => goal._id === e.target.value
    );
    if (goalToSelect) {
      setSelectedGoal(goalToSelect);
    } else {
      setSelectedGoal(null);
    }
  };

  const handleNewAchievement = async (e: any) => {
    e.preventDefault();
    console.log(
      "Achievement Form 1",
      selectedCategory!.style,
      selectedGoal!.text,
      selectedDate.toISOString()
    );
    if (selectedCategory && selectedGoal && selectedDate) {
      const newAchievement = await AchievementApi.createAchievement({
        goalText: selectedGoal.text,
        stickerStyle: selectedCategory.style,
        stickerNumber: selectedGoal.sticker,
        dateAchieved: selectedDate.toISOString(),
      });
      // TODO error handling, clear form
      addNewAchievement(newAchievement);
      setSelectedCategory(null);
      setSelectedGoal(null);
    }
  };
  return (
    <>
      <h2>
        {goalsLoading ? (
          <FaSpinner className={utilStyles.spinner} />
        ) : (
          <>
            <FaStar /> <span>Add an Achievement</span>
          </>
        )}
      </h2>

      <Form onSubmit={handleNewAchievement}>
        <select onChange={(e) => selectACategory(e)}>
          <option>Select a Category</option>
          {categories.length &&
            categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.title}
              </option>
            ))}
        </select>
        <select onChange={(e) => selectAGoal(e)}>
          <option>Select a Goal</option>
          {!!selectedCategory &&
            selectedCategory.goals.map((goal) => (
              <option key={goal._id} value={goal._id}>
                {goal.text}
              </option>
            ))}
        </select>
        <button className={utilStyles.customBtn} type="submit">
          Submit
        </button>
      </Form>
    </>
  );
};

export default AchievementForm;
