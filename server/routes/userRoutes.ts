import express from "express";
import * as UserCtrl from "../controllers/userCtrl";
import { requiresAuth } from "../middleware/auth";

const router = express.Router();

router.get("/", requiresAuth, UserCtrl.getAuthenticatedUser);
router.post("/register", UserCtrl.register);
router.post("/login", UserCtrl.login);
router.post("/logout", UserCtrl.logout);

export default router;
