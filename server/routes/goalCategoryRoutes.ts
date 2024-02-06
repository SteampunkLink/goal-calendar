import express from "express";
import * as goalCategoryCtrl from "../controllers/goalCategoryCtrl";

const router = express.Router();

router.get("/", goalCategoryCtrl.getAllCategories);
router.get("/:id", goalCategoryCtrl.getOneGoalCategory);
router.post("/", goalCategoryCtrl.createGoalCategory);
router.patch("/:id", goalCategoryCtrl.updateGoalCategory);
router.delete("/:id", goalCategoryCtrl.deleteGoalCategory);

export default router;
