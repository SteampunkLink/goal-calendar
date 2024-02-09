import { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import AddEditGoalListModal from "../components/AddEditGoalListModal";
import GoalListCard from "../components/GoalListCard";
import { GoalList } from "../models/goalList";
import * as GoalsApi from "../network/goals_api";
import utilStyles from "../styles/Utils.module.css";

const NotesPageLoggedInView = () => {
  const [goalLists, setGoalLists] = useState<GoalList[]>([]);
  const [goalsLoading, setGoalsLoading] = useState(true);
  const [showGoalsLoadingError, setShowGoalsLoadingError] = useState(false);
  const [showAddEditGoalListModal, setShowAddEditGoalListModal] =
    useState(false);
  const [goalListToEdit, setGoalListToEdit] = useState<GoalList | null>(null);

  useEffect(() => {
    const loadGoals = async () => {
      try {
        setShowGoalsLoadingError(false);
        setGoalsLoading(true);
        const goalData = await GoalsApi.fetchGoalLists();
        setGoalLists(goalData);
      } catch (error) {
        console.log(error);
        setShowGoalsLoadingError(true);
      } finally {
        setGoalsLoading(false);
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

  const goalListGrid = (
    <>
      {goalLists.map((list) => (
        <GoalListCard
          key={list._id}
          list={list}
          onNoteClicked={setGoalListToEdit}
          onDeleteNoteClicked={deleteList}
        ></GoalListCard>
      ))}
    </>
  );

  return (
    <>
      <Button
        className={`mt-4 ${utilStyles.blockCenter} ${utilStyles.flexCenter}`}
        onClick={() => setShowAddEditGoalListModal(true)}
      >
        <FaPlus />
        Add New Category
      </Button>
      {goalsLoading && <Spinner animation="border" variant="primary" />}
      {showGoalsLoadingError && (
        <p>Sorry, an error has occured. Please refresh the page.</p>
      )}
      {!goalsLoading && !showGoalsLoadingError && (
        <>
          {goalLists.length > 0 ? (
            goalListGrid
          ) : (
            <p>No goal lists to display.</p>
          )}
        </>
      )}
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
    </>
  );
};

export default NotesPageLoggedInView;
