const express = require("express");
const router = express.Router();

// Helpers
const helpers = require("../helpers/auth");

const item_price_controller = require("../controllers/item_price.controller");

router.get('/',helpers.isAuthenticated,helpers.validatePermision,item_price_controller.index)

router.get('/render/:view/:id*?',helpers.isAuthenticated,item_price_controller.renderIndex)

router.post("/getAll",helpers.isAuthenticated, item_price_controller.getAll);

router.post("/create",helpers.isAuthenticated, item_price_controller.create);

router.post("/edit",helpers.isAuthenticated, item_price_controller.update);

router.post("/delete",helpers.isAuthenticated, item_price_controller.deleteItem);

module.exports = router;
