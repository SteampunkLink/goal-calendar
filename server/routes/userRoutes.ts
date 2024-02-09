import express from "express";
import * as UserCtrl from "../controllers/userCtrl";

const router = express.Router();

router.get("/", UserCtrl.getAuthenticatedUser);
router.post("/register", UserCtrl.register);
router.post("/login", UserCtrl.login);
router.post("/logout", UserCtrl.logout);

export default router;
