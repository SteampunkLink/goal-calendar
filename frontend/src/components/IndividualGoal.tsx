import { Card, Button } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { Goal } from "../models/goalList";
import * as GoalsApi from "../network/goals_api";
import styles from "../styles/IndividualGoal.module.css";

interface IndividualGoalProps {
  listId: string;
  goal: Goal;
  onGoalDelete: (goalId: string) => void;
}

const IndividualGoal = ({
  listId,
  goal,
  onGoalDelete,
}: IndividualGoalProps) => {
  const confirmDelete = async () => {
    const goalToDelete = await GoalsApi.deleteGoalFromList(listId, goal._id);
    onGoalDelete(goalToDelete);
  };
  return (
    <Card.Text className={styles.individualGoal}>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          confirmDelete();
        }}
      >
        <FaTimes />
      </Button>
      {goal.text}
    </Card.Text>
  );
};

export default IndividualGoal;
