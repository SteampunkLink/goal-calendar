import express from "express";
import * as achievementCtrl from "../controllers/achievementCtrl";

const router = express.Router();

router.get("/month/:start/:end", achievementCtrl.getAchievementsByMonth);
router.get("/day/:date", achievementCtrl.getAchievementsByDay);
router.post("/", achievementCtrl.createAchievement);
router.patch("/:achievementId", achievementCtrl.updateAchievement);
router.delete("/:achievementId", achievementCtrl.deleteAchievement);

export default router;
