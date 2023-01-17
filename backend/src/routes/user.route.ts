import express from "express";
import userController from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/savedDishes", authMiddleware, userController.getSavedDishes)
router.post("/savedDishes", authMiddleware,  userController.saveDish)
router.delete("/savedDishes/:dishName", authMiddleware, userController.removeSavedDish)
router.post('/', userController.addUser);
router.get("/:uid", userController.getByUid)
router.get("/details/:id", userController.getById)
router.patch("/:id", userController.updateById)


export default router;