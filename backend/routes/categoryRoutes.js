import express from "express";
import { getCategories } from "../controllers/categoryController.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();
router.get("/", getCategories);
export default router;