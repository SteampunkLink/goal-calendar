import express from "express";
import * as goalCtrl from "../controllers/goalCtrl";

const router = express.Router();

router.post("/:categoryId", goalCtrl.createGoal);
router.patch("/:goalId/:categoryId", goalCtrl.updateGoalSticker);
router.delete("/:goalId/:categoryId", goalCtrl.deleteGoal);

export default router;
