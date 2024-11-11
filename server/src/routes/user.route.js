import express from "express";
import { registerUser, loginUser, getAllUsers, updateUser, deleteUser, getSingleUser, getRole } from "../controllers/user.controller.js";
import { protect, adminOnly, teacherOnly, adminOrTeacherOnly } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser/:id", protect, getSingleUser);
router.get("/allUsers", protect, adminOrTeacherOnly, getAllUsers);
router.put("/updateuser/:id", protect, adminOnly, updateUser);
router.get("/getRole/:id", protect, getRole);
router.delete("/:id", protect, adminOnly, deleteUser);

export default router;
