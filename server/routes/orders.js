const express = require("express");
const router = express.Router();
const ordersController = require("../controller/orders");

router.get("/ordersFetch", ordersController.allOrders);
router.post("/userOrder", ordersController.userOrder);

router.post("/orderCreate", ordersController.orderCreate);
router.post("/orderEdit", ordersController.updateOrder);
router.post("/orderDelete", ordersController.orderDelete);

module.exports = router;
