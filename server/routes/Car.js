const express = require("express");
const router = express.Router();

const carController = require("../controller/carController")

router.get("/", carController.getAllCars);
router.get("/filterby", carController.getCarsByAvailability);
router.post("/post", carController.postCar);
router.delete("/:id", carController.deleteCar);

router.use("/book", require("./BookCar"));

module.exports = router;