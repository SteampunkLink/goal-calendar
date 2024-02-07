import express from "express";
import * as goalListCtrl from "../controllers/goalListCtrl";

const router = express.Router();

router.get("/", goalListCtrl.getAllLists);
router.get("/:id", goalListCtrl.getOneList);
router.post("/", goalListCtrl.createGoalList);
router.patch("/:id", goalListCtrl.updateGoalList);
router.patch("/addGoal/:id", goalListCtrl.addGoalToList);
router.patch("/removeGoal/:id", goalListCtrl.removeGoalFromList);
router.delete("/:id", goalListCtrl.deleteGoalList);

export default router;