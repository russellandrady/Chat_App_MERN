import express from "express";
import { getAllUsers, getUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/:id", getUser);
router.get("/all-users/:id", getAllUsers);

export default router;