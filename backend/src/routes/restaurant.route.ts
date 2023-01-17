import express from "express";
import restaurantController from "../controllers/restaurant.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/all", restaurantController.getAll)
router.get("/:id", restaurantController.getById)
router.patch("/:id", restaurantController.updateById)
router.post("/comments", authMiddleware, restaurantController.saveComment)
router.post("/ratings", authMiddleware, restaurantController.saveRating)
router.post("/dish-ratings", authMiddleware, restaurantController.saveDishRating)
router.post("/dish-comments", authMiddleware, restaurantController.saveDishComment)
router.post("/uploadDishImage", authMiddleware, restaurantController.uploadDishImage)


export default router;