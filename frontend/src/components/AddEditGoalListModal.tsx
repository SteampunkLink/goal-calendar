import { Modal, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { GoalList } from "../models/goalList";
import { GoalListInputInterface } from "../network/goals_api";
import * as GoalsApi from "../network/goals_api";

interface AddEditGoalListModalProps {
  goalListToEdit?: GoalList;
  onDismiss: () => void;
  onGoalListSaved: (goalList: GoalList) => void;
}

const AddEditGoalListModal = ({
  goalListToEdit,
  onDismiss,
  onGoalListSaved,
}: AddEditGoalListModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GoalListInputInterface>({
    defaultValues: {
      title: goalListToEdit?.title || "",
      desc: goalListToEdit?.desc || "",
      style: goalListToEdit?.style || "stars",
    },
  });

  const onSubmit = async (input: GoalListInputInterface) => {
    try {
      let goalListReponse: GoalList;
      if (goalListToEdit) {
        goalListReponse = await GoalsApi.updateGoalList(
          goalListToEdit._id,
          input
        );
      } else {
        goalListReponse = await GoalsApi.createGoalList(input);
      }
      onGoalListSaved(goalListReponse);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>
          {goalListToEdit ? "Edit Goal List" : "Add New Goal List"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="addEditGoalListForm" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              isInvalid={!!errors.title}
              {...register("title", { required: "Required" })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description (optional)</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              placeholder="Text"
              {...register("desc")}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>List Theme</Form.Label>
            <Form.Select
              {...register("style", { required: "Required" })}
              isInvalid={!!errors.style}
            >
              <option value="stars">Stars</option>
              <option value="music">Music</option>
              <option value="fitness">Fitness</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.style?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="submit"
          form="addEditGoalListForm"
          disabled={isSubmitting}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEditGoalListModal;
