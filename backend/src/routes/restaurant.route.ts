import express from "express";
import restaurantController from "../controllers/restaurant.controller";

const router = express.Router();

router.get("/all", restaurantController.getAll)
router.get("/:id", restaurantController.getById)
router.patch("/:id", restaurantController.updateById)
router.post("/comments", restaurantController.saveComment)
router.post("/ratings", restaurantController.saveRating)


export default router;