import { useState } from "react";
import { FaPlus, FaSpinner } from "react-icons/fa";
import * as CategoriesApi from "../../network/categories_api";
import { Category } from "../../models/category";
import CategoryCard from "./CategoryCard";
import AddEditCategoryModal from "./AddEditCategoryModal";
import utilStyles from "../../styles/Utils.module.css";

interface GoalsProps {
  categories: Category[];
  goalsLoading: boolean;
  setCategories: (categories: Category[]) => void;
}

const Goals = ({ categories, goalsLoading, setCategories }: GoalsProps) => {
  const [showAddEditCategoryModal, setShowAddEditCategoryModal] =
    useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
  const [goalError, setGoalError] = useState("");

  const deleteCategory = async (categoryToDelete: Category) => {
    try {
      await CategoriesApi.deleteCategory(categoryToDelete._id);
      setCategories(
        categories.filter((cat) => cat._id !== categoryToDelete._id)
      );
    } catch (error) {
      setGoalError(
        "Error occurred while deleting goal. Try again later, or reload page."
      );
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
      {goalError && <div className={utilStyles.errorBox}>{goalError}</div>}
      <div className={utilStyles.flexCenter}>
        <button
          className={utilStyles.customBtn}
          onClick={() => setShowAddEditCategoryModal(true)}
        >
          {goalsLoading ? (
            <FaSpinner className={utilStyles.spinner} />
          ) : (
            <FaPlus />
          )}
          <span>Add New Category</span>
        </button>
      </div>

      <>
        {categories.length > 0 ? (
          categoryGrid
        ) : (
          <div className={utilStyles.displayBox}>No goal lists to display.</div>
        )}
      </>

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
