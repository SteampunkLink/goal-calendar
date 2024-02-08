import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { GoalList } from "./models/goalList";
import GoalListCard from "./components/GoalListCard";
import * as GoalsApi from "./network/goals_api";
import AddEditGoalListModal from "./components/AddEditGoalListModal";
import utilStyles from "./styles/Utils.module.css";

function App() {
  const [goalLists, setGoalLists] = useState<GoalList[]>([]);
  const [showAddEditGoalListModal, setShowAddEditGoalListModal] =
    useState(false);
  const [goalListToEdit, setGoalListToEdit] = useState<GoalList | null>(null);

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

  const deleteList = async (listToDelete: GoalList) => {
    try {
      await GoalsApi.deleteGoalList(listToDelete._id);
      setGoalLists(goalLists.filter((list) => list._id !== listToDelete._id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Button
        className={`mt-4 ${utilStyles.blockCenter} ${utilStyles.flexCenter}`}
        onClick={() => setShowAddEditGoalListModal(true)}
      >
        <FaPlus />
        Add New Category
      </Button>
      {goalLists.map((list) => (
        <GoalListCard
          key={list._id}
          list={list}
          onNoteClicked={setGoalListToEdit}
          onDeleteNoteClicked={deleteList}
        ></GoalListCard>
      ))}
      {showAddEditGoalListModal && (
        <AddEditGoalListModal
          onDismiss={() => setShowAddEditGoalListModal(false)}
          onGoalListSaved={(newGoalList) => {
            setGoalLists([...goalLists, newGoalList]);
            setShowAddEditGoalListModal(false);
          }}
        />
      )}
      {goalListToEdit && (
        <AddEditGoalListModal
          goalListToEdit={goalListToEdit}
          onDismiss={() => setGoalListToEdit(null)}
          onGoalListSaved={(updatedGoalList) => {
            setGoalLists(
              goalLists.map((list) =>
                list._id === updatedGoalList._id ? updatedGoalList : list
              )
            );
            setGoalListToEdit(null);
          }}
        />
      )}
    </Container>
  );
}

export default App;
