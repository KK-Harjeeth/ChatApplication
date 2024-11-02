import express from "express";
import { signUp,login,logout, getUsersProfiles } from "../controllers/user.controller.js";
import secureRoute from "../middleware/secureRoute.js";
const router = express.Router();
router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout",logout);
router.get("/getUsersProfiles",secureRoute,getUsersProfiles)
export default router;