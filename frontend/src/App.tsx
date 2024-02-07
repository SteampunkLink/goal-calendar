import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { GoalList } from "./models/goalList";
import CategoryCard from "./components/CategoryCard";
import * as GoalsApi from "./network/goals_api";
import AddCategoryModal from "./components/AddCategoryModal";

function App() {
  const [goalLists, setGoalLists] = useState<GoalList[]>([]);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

  useEffect(() => {
    const loadGoals = async () => {
      try {
        const goalData = await GoalsApi.fetchGoalLists();
        setGoalLists(goalData);
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
      {goalLists.map((list) => (
        <CategoryCard key={list._id} list={list}></CategoryCard>
      ))}
      {showAddCategoryModal && (
        <AddCategoryModal onDismiss={() => setShowAddCategoryModal(false)} />
      )}
    </>
  );
}

export default App;
