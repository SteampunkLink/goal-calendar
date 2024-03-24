import { useState } from "react";
import { Form } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import * as GoalsApi from "../../network/goals_api";
import { Goal } from "../../models/goal";
import utilStyles from "../../styles/Utils.module.css";
import styles from "../../styles/GoalListCard.module.css";

interface AddGoalFormProps {
  categoryId: string;
  onAddNewGoal: (newGoal: Goal) => void;
}

const AddGoalForm = ({ categoryId, onAddNewGoal }: AddGoalFormProps) => {
  const [newGoalText, setNewGoalText] = useState("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const goalresponse = await GoalsApi.createGoal(categoryId, newGoalText);
      onAddNewGoal(goalresponse);
      setNewGoalText("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      className={styles.goalListCardBodyForm}
      onSubmit={(e) => handleSubmit(e)}
    >
      <label htmlFor="goalText" className={utilStyles.sronly}>
        New Goal
      </label>
      <input
        className={utilStyles.textField}
        type="text"
        name="goalText"
        placeholder="New Goal"
        value={newGoalText}
        onChange={(e) => setNewGoalText(e.target.value)}
      />
      <button
        type="submit"
        className={utilStyles.customBtn}
        disabled={!newGoalText}
      >
        <FaPlus />
      </button>
    </Form>
  );
};

export default AddGoalForm;
