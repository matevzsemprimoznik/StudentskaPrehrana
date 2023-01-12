import express from "express";
import userController from "../controllers/user.controller";

const router = express.Router();

router.post('/', userController.addUser);
router.get("/:uid", userController.getByUid)
router.get("/details/:id", userController.getById)
router.patch("/:id", userController.updateById)
export default router;