const express = require("express");
const router = express.Router();

// Helpers
const helpers = require("../helpers/auth");

const general_information_controller = require("../controllers/general_information.controller");

router.get('/',helpers.isAuthenticated,helpers.validatePermision,general_information_controller.index)

router.get('/render/:view/:id*?',helpers.isAuthenticated,general_information_controller.renderIndex)

router.post("/getAll",helpers.isAuthenticated, general_information_controller.getAll);

router.post("/create",helpers.isAuthenticated, general_information_controller.create);

router.post("/edit",helpers.isAuthenticated, general_information_controller.update);

router.post("/delete",helpers.isAuthenticated, general_information_controller.deleteItem);

router.get('/token',helpers.isAuthenticated,general_information_controller.token)

module.exports = router;
