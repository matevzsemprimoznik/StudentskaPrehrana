import express from "express";
import restaurantController from "../controllers/restaurant.controller";

const router = express.Router();

router.get("/all", restaurantController.getAll)
router.get("/:id", restaurantController.getById)
router.patch("/:id", restaurantController.updateById)

export default router;