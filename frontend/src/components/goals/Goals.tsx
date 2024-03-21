import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import * as CategoriesApi from "../../network/categories_api";
import { Category } from "../../models/category";
import CategoryCard from "./CategoryCard";
import AddEditCategoryModal from "./AddEditCategoryModal";
import utilStyles from "../../styles/Utils.module.css";

interface GoalsProps {
  categories: Category[];
  goalsLoading: boolean;
  showGoalsError: boolean;
  setCategories: (categories: Category[]) => void;
}

const Goals = ({
  categories,
  goalsLoading,
  showGoalsError,
  setCategories,
}: GoalsProps) => {
  const [showAddEditCategoryModal, setShowAddEditCategoryModal] =
    useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);

  const deleteCategory = async (categoryToDelete: Category) => {
    try {
      await CategoriesApi.deleteCategory(categoryToDelete._id);
      setCategories(
        categories.filter((cat) => cat._id !== categoryToDelete._id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const categoryGrid = (
    <>
      {categories.map((cat) => (
        <CategoryCard
          key={cat._id}
          displayedCategory={cat}
          onNoteClicked={setCategoryToEdit}
          onDeleteNoteClicked={deleteCategory}
        ></CategoryCard>
      ))}
    </>
  );

  return (
    <>
      <Button
        className={`mt-4 ${utilStyles.blockCenter} ${utilStyles.flexCenter}`}
        onClick={() => setShowAddEditCategoryModal(true)}
      >
        <FaPlus />
        Add New Category
      </Button>
      {goalsLoading && <Spinner animation="border" variant="primary" />}
      {showGoalsError && (
        <p>Sorry, an error has occured. Please refresh the page.</p>
      )}
      {!goalsLoading && !showGoalsError && (
        <>
          {categories.length > 0 ? (
            categoryGrid
          ) : (
            <p>No goal lists to display.</p>
          )}
        </>
      )}
      {showAddEditCategoryModal && (
        <AddEditCategoryModal
          onDismiss={() => setShowAddEditCategoryModal(false)}
          onCategorySaved={(newCategory) => {
            setCategories([...categories, newCategory]);
            setShowAddEditCategoryModal(false);
          }}
        />
      )}
      {categoryToEdit && (
        <AddEditCategoryModal
          categoryToEdit={categoryToEdit}
          onDismiss={() => setCategoryToEdit(null)}
          onCategorySaved={(updatedCategory) => {
            setCategories(
              categories.map((cat) =>
                cat._id === updatedCategory._id ? updatedCategory : cat
              )
            );
            setCategoryToEdit(null);
          }}
        />
      )}
    </>
  );
};

export default Goals;
