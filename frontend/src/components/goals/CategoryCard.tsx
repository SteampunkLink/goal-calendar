import { useState } from "react";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import { Category } from "../../models/category";
import { Goal } from "../../models/goal";
import { formatDate } from "../../utils/formatDate";
import styles from "../../styles/GoalListCard.module.css";
import utilStyles from "../../styles/Utils.module.css";
import AddGoalForm from "./AddGoalForm";
import IndividualGoal from "./IndividualGoal";
import StickerDisplay from "../StickerDisplay";

interface CategoryCardProps {
  displayedCategory: Category;
  onNoteClicked: (category: Category) => void;
  onDeleteNoteClicked: (category: Category) => void;
}

const CategoryCard = ({
  displayedCategory,
  onNoteClicked,
  onDeleteNoteClicked,
}: CategoryCardProps) => {
  const [goalsInCategory, setGoalsInCategory] = useState<Goal[]>(
    displayedCategory.goals
  );
  let createdUpdatedText: string;
  if (displayedCategory.updatedAt > displayedCategory.createdAt) {
    createdUpdatedText = "Updated " + formatDate(displayedCategory.updatedAt);
  } else {
    createdUpdatedText = "Created " + formatDate(displayedCategory.createdAt);
  }

  const handleDelete = (goalId: string) => {
    setGoalsInCategory(goalsInCategory.filter((g) => g._id !== goalId));
  };

  return (
    <div className={styles.goalListCardContainer}>
      <div className={styles.goalListCard}>
        <div className={styles.goalListCardHeader}>
          <h2>{displayedCategory.title}</h2>
          <button
            className={utilStyles.customBtn}
            onClick={(e) => {
              onDeleteNoteClicked(displayedCategory);
              e.stopPropagation();
            }}
          >
            <FaTrash />
          </button>
        </div>

        <div className={styles.goalListCardBody}>
          <div className={styles.goalListCardCategory}>
            <button
              className={utilStyles.customBtn}
              onClick={(e) => {
                onNoteClicked(displayedCategory);
                e.stopPropagation();
              }}
            >
              <FaPencilAlt /> Edit Category Properties
            </button>
            <StickerDisplay style={displayedCategory.style} />
          </div>

          <div className={styles.goalListCardBodyGoals}>
            <AddGoalForm
              categoryId={displayedCategory._id}
              onAddNewGoal={(newGoal) =>
                setGoalsInCategory([...goalsInCategory, newGoal])
              }
            />
            {goalsInCategory.length > 0 &&
              goalsInCategory.map((goal) => (
                <IndividualGoal
                  key={goal._id}
                  categoryId={displayedCategory._id}
                  stickerStyle={displayedCategory.style}
                  goal={goal}
                  onGoalDelete={(goalId) => handleDelete(goalId)}
                />
              ))}
          </div>
        </div>
        <div className={styles.goalListCardFooter}>{createdUpdatedText}</div>
      </div>
    </div> // end goalListCardContainer
  );
};

export default CategoryCard;
