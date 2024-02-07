import styles from "../styles/CategoryCard.module.css";
import { Card } from "react-bootstrap";
import { GoalCategory } from "../models/goalCategories";
import { Goal } from "../models/goals";
import { formatDate } from "../utils/formateDate";

interface CategoryCardProps {
  category: GoalCategory;
  goals: Goal[];
}

const CategoryCard = ({ category, goals }: CategoryCardProps) => {
  let createdUpdatedText: string;
  if (category.updatedAt > category.createdAt) {
    createdUpdatedText = "Updated " + formatDate(category.updatedAt);
  } else {
    createdUpdatedText = "Created " + formatDate(category.createdAt);
  }
  return (
    <Card className={styles.categoryCard}>
      <Card.Body className={styles.categoryCardBody}>
        <Card.Title>{category.title}</Card.Title>
        {goals.map((g) => (
          <Card.Text key={g._id} className={styles.categoryCardText}>
            {g.displayText}
          </Card.Text>
        ))}
      </Card.Body>
      <Card.Footer className="text-muted">{createdUpdatedText}</Card.Footer>
    </Card>
  );
};

export default CategoryCard;
