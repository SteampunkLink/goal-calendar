import styles from "../styles/CategoryCard.module.css";
import { Card } from "react-bootstrap";
import { GoalList } from "../models/goalList";
import { formatDate } from "../utils/formateDate";

interface GoalListCardProps {
  list: GoalList;
}

const GoalListCard = ({ list }: GoalListCardProps) => {
  let createdUpdatedText: string;
  if (list.updatedAt > list.createdAt) {
    createdUpdatedText = "Updated " + formatDate(list.updatedAt);
  } else {
    createdUpdatedText = "Created " + formatDate(list.createdAt);
  }
  return (
    <Card className={styles.goalListCard}>
      <Card.Body className={styles.goalListCardBody}>
        <Card.Title>{list.title}</Card.Title>
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
