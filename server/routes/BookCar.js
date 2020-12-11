const express = require("express");
const router = express.Router();

const bookedController = require("../controller/bookedController")

router.get('/booked', bookedController.bookedByUser);
router.post("/:car_id", bookedController.bookCar);
router.delete("/:id", bookedController.deleteBooked);

module.exports = router;