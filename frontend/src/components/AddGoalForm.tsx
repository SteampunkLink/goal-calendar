import { FormEvent, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
// import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
// import TextInput from "./form/TextInput";
// import { GoalInterface } from "../network/goals_api";
import * as GoalsApi from "../network/goals_api";
import { Goal } from "../models/goalList";

interface AddGoalFormProps {
  listId: string;
  onAddNewGoal: (newGoals: Goal[]) => void;
}

const AddGoalForm = ({ listId, onAddNewGoal }: AddGoalFormProps) => {
  const [newGoalText, setNewGoalText] = useState<string>("");

  const handleNewGoalSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (newGoalText) {
        const newGoalResponse = await GoalsApi.addGoalToList(
          listId,
          newGoalText
        );
        setNewGoalText("");
        onAddNewGoal(newGoalResponse);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      id="addNewGoal"
      onSubmit={(e) => handleNewGoalSubmit(e)}
      onClick={(e) => e.stopPropagation()}
    >
      <Row className="align-items-top justify-content-sm-center">
        <Col sm={10}>
          <Form.Control
            type="text"
            name="goal"
            value={newGoalText}
            onChange={(e) => setNewGoalText(e.target.value)}
            placeholder="New goal text"
            aria-label="New goal text"
          />
        </Col>
        <Col sm={2}>
          <Button type="submit" form="addNewGoal">
            <FaPlus />
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddGoalForm;
