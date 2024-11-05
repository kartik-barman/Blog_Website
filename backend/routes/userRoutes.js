import express from "express";
import { createUserApi, loginUserApi, userDetailsUpdateApi } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", createUserApi);
router.post("/login", loginUserApi);
router.put("/update/:id", userDetailsUpdateApi)


export default router;
