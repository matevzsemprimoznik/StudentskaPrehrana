import express from "express";
import restaurantController from "../controllers/restaurant.controller";

const router = express.Router();

router.get("/all", restaurantController.getAll)
router.get("/:id", restaurantController.getById)
router.patch("/:id", restaurantController.updateById)
router.post("/comments", authMiddleware, restaurantController.saveComment)
router.post("/ratings", authMiddleware, restaurantController.saveRating)
router.post("/dish-ratings", restaurantController.saveDishRating)
router.post("/dish-comments", restaurantController.saveDishComment)


export default router;