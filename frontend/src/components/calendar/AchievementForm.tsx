import { useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Spinner, Button } from "react-bootstrap";
import { Category } from "../../models/category";
import { Goal } from "../../models/goal";
import * as AchievementApi from "../../network/achievements_api";
import { Achievement } from "../../models/achievement";

interface AchievementFormProps {
  categories: Category[];
  goalsLoading: boolean;
  showGoalsError: boolean;
  addNewAchievement: (achievement: Achievement) => void;
}

type DateViewParams = {
  dateISO: string;
};

const AchievementForm = ({
  categories,
  goalsLoading,
  showGoalsError,
  addNewAchievement,
}: AchievementFormProps) => {
  const { dateISO } = useParams<DateViewParams>();
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
    if (selectedCategory && selectedGoal && dateISO) {
      const newAchievement = await AchievementApi.createAchievement({
        goalText: selectedGoal.text,
        stickerStyle: selectedCategory.style,
        stickerNumber: selectedGoal.sticker,
        dateAchieved: dateISO,
      });
      // TODO error handling, clear form
      addNewAchievement(newAchievement);
      setSelectedCategory(null);
      setSelectedGoal(null);
    }
  };
  return (
    <>
      <h2>Add an Achievement</h2>
      {goalsLoading && <Spinner animation="border" variant="primary" />}
      {showGoalsError && (
        <p>Sorry, an error has occured. Please refresh the page.</p>
      )}
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
        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
};

export default AchievementForm;
