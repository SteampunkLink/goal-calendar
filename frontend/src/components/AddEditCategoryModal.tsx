import { Modal, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Category } from "../models/category";
import { CategoryInputInterface } from "../network/categories_api";
import TextInput from "./form/TextInput";
import * as CategoriesApi from "../network/categories_api";

interface AddEditCategoryModalProps {
  categoryToEdit?: Category;
  onDismiss: () => void;
  onCategorySaved: (category: Category) => void;
}

const AddEditCategoryModal = ({
  categoryToEdit,
  onDismiss,
  onCategorySaved,
}: AddEditCategoryModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CategoryInputInterface>({
    defaultValues: {
      title: categoryToEdit?.title || "",
      style: categoryToEdit?.style || "stars",
    },
  });

  const onSubmit = async (input: CategoryInputInterface) => {
    try {
      let categoryResponse: Category;
      if (categoryToEdit) {
        categoryResponse = await CategoriesApi.updateCategory(
          categoryToEdit._id,
          input
        );
      } else {
        categoryResponse = await CategoriesApi.createCategory(input);
      }
      onCategorySaved(categoryResponse);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>
          {categoryToEdit ? "Edit Category" : "Add New Category"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="addEditCategoryForm" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            name="title"
            label="Title"
            type="text"
            placeholder="Title"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.title}
          />

          <Form.Group className="mb-3">
            <Form.Label>List Theme</Form.Label>
            <Form.Select
              {...register("style", { required: "Required" })}
              isInvalid={!!errors.style}
            >
              <option value="stars">Stars</option>
              <option value="music">Music</option>
              <option value="fitness">Fitness</option>
              <option value="games">Games</option>
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
          form="addEditCategoryForm"
          disabled={isSubmitting}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEditCategoryModal;
