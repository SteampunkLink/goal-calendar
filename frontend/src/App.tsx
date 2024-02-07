import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Goal } from "./models/goals";
import { GoalCategory } from "./models/goalCategories";
import CategoryCard from "./components/CategoryCard";
import * as GoalsApi from "./network/goals_api";
import AddCategoryModal from "./components/AddCategoryModal";

function App() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [categories, setCategories] = useState<GoalCategory[]>([]);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

  useEffect(() => {
    const loadGoals = async () => {
      try {
        const goalData = await GoalsApi.fetchGoals();
        setGoals(goalData.goals);
        setCategories(goalData.categories);
      } catch (error) {
        console.log(error);
      }
    };
    loadGoals();
  }, []);

  return (
    <>
      <Button onClick={() => setShowAddCategoryModal(true)}>
        Add New Category
      </Button>
      {categories.length &&
        categories.map((cat) => (
          <CategoryCard
            key={cat._id}
            category={cat}
            goals={goals.filter((g) => g.category === cat._id)}
          ></CategoryCard>
        ))}
      {showAddCategoryModal && (
        <AddCategoryModal onDismiss={() => setShowAddCategoryModal(false)} />
      )}
    </>
  );
}

export default App;
