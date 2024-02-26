import express from "express";
import * as categoryCtrl from "../controllers/categoryCtrl";

const router = express.Router();

router.get("/", categoryCtrl.getAllCategories);
router.post("/", categoryCtrl.createCategory);
router.patch("/:id", categoryCtrl.updateCategory);
router.delete("/:id", categoryCtrl.deleteCategory);

export default router;
