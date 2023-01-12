import express from "express";
import restaurantController from "../controllers/restaurant.controller";

const router = express.Router();

router.get("/all", restaurantController.getAll)
router.get("/:id", restaurantController.getById)
router.post("/uploadDishImage", restaurantController.uploadDishImage)

export default router;