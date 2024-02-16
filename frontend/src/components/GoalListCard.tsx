import { useState } from "react";
import { Card } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { Goal, GoalList } from "../models/goalList";
import { formatDate } from "../utils/formatDate";
import styles from "../styles/GoalListCard.module.css";
import utilStyles from "../styles/Utils.module.css";
import AddGoalForm from "./AddGoalForm";
import IndividualGoal from "./IndividualGoal";

interface GoalListCardProps {
  list: GoalList;
  onNoteClicked: (goalList: GoalList) => void;
  onDeleteNoteClicked: (goalList: GoalList) => void;
}

const GoalListCard = ({
  list,
  onNoteClicked,
  onDeleteNoteClicked,
}: GoalListCardProps) => {
  const [goalsInList, setGoalsInList] = useState<Goal[]>(list.goals);
  let createdUpdatedText: string;
  if (list.updatedAt > list.createdAt) {
    createdUpdatedText = "Updated " + formatDate(list.updatedAt);
  } else {
    createdUpdatedText = "Created " + formatDate(list.createdAt);
  }

  const handleDelete = (goalId: string) => {
    setGoalsInList(goalsInList.filter((g) => g._id !== goalId));
  };

  return (
    <Card className={styles.goalListCard} onClick={() => onNoteClicked(list)}>
      <Card.Body className={styles.goalListCardBody}>
        <div className={styles.goalListCardCategory}>
          <Card.Title className={utilStyles.flexCenter}>
            {list.title}
          </Card.Title>
        </div>
        <div className={styles.goalListCardBodyGoals}>
          <AddGoalForm
            listId={list._id}
            onAddNewGoal={(newGoals) => setGoalsInList(newGoals)}
          />
          {goalsInList.length > 0 &&
            goalsInList.map((goal) => (
              <IndividualGoal
                key={goal._id}
                listId={list._id}
                goal={goal}
                onGoalDelete={(goalId) => handleDelete(goalId)}
              />
            ))}
        </div>
      </Card.Body>
      <Card.Footer className={styles.goalListCardFooter}>
        {createdUpdatedText}
        <FaTrash
          onClick={(e) => {
            onDeleteNoteClicked(list);
            e.stopPropagation();
          }}
        />
      </Card.Footer>
    </Card>
  );
};

export default GoalListCard;
