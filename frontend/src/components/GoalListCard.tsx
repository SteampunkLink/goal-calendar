import styles from "../styles/CategoryCard.module.css";
import { Card } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { GoalList } from "../models/goalList";
import { formatDate } from "../utils/formateDate";
import utilStyles from "../styles/Utils.module.css";

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
  let createdUpdatedText: string;
  if (list.updatedAt > list.createdAt) {
    createdUpdatedText = "Updated " + formatDate(list.updatedAt);
  } else {
    createdUpdatedText = "Created " + formatDate(list.createdAt);
  }
  return (
    <Card className={styles.goalListCard} onClick={() => onNoteClicked(list)}>
      <Card.Body className={styles.goalListCardBody}>
        <Card.Title className={utilStyles.flexCenter}>
          {list.title}
          <MdDelete
            className="text-muted ms-auto"
            onClick={(e) => {
              onDeleteNoteClicked(list);
              e.stopPropagation();
            }}
          />
        </Card.Title>
        {list.goals &&
          list.goals.map((goal) => (
            <Card.Text key={goal._id} className={styles.goalListCardText}>
              {goal.text}
            </Card.Text>
          ))}
      </Card.Body>
      <Card.Footer className="text-muted">{createdUpdatedText}</Card.Footer>
    </Card>
  );
};

export default GoalListCard;
