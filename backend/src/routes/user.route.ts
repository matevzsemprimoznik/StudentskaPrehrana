import express from "express";
import userController from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = express.Router();

router.post('/', userController.addUser);
router.get("/:uid", userController.getByUid)
router.get("/details/:id", userController.getById)
router.patch("/:id", userController.updateById)
router.get("/savedDishes", authMiddleware, userController.getSavedDishes)
router.post("/savedDishes", userController.saveDish)
router.delete("/savedDishes/:id/:dishName", userController.removeSavedDish)


export default router;