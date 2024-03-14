import { Button, Form, Row, Col } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { NewGoalInputInterface } from "../../network/goals_api";
import * as GoalsApi from "../../network/goals_api";
import { Goal } from "../../models/goal";
import TextInput from "../form/TextInput";

interface AddGoalFormProps {
  categoryId: string;
  onAddNewGoal: (newGoal: Goal) => void;
}

const AddGoalForm = ({ categoryId, onAddNewGoal }: AddGoalFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewGoalInputInterface>({
    defaultValues: {
      goalText: "",
    },
  });

  const onSubmit = async (input: NewGoalInputInterface) => {
    try {
      const goalresponse = await GoalsApi.createGoal(
        categoryId,
        input.goalText
      );
      onAddNewGoal(goalresponse);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form id={`addNewGoal-${categoryId}`} onSubmit={handleSubmit(onSubmit)}>
      <Row className="align-items-top justify-content-sm-center">
        <Col sm={10}>
          <TextInput
            name="goalText"
            label="New Goal"
            type="text"
            placeholder="New Goal"
            register={register}
            registerOptions={{ required: true }}
            error={errors.goalText}
          />
        </Col>
        <Col sm={2}>
          <Button
            type="submit"
            form={`addNewGoal-${categoryId}`}
            disabled={isSubmitting}
          >
            <FaPlus />
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddGoalForm;
