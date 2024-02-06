import express from "express";
import * as goalCtrl from "../controllers/goalCtrl";

const router = express.Router();

router.get("/", goalCtrl.getAllGoals);
router.get("/:id", goalCtrl.getOneGoal);
router.post("/", goalCtrl.createGoal);
router.patch("/:id", goalCtrl.updateGoal);
router.delete("/:id", goalCtrl.deleteGoal);

export default router;
