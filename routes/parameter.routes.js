const express = require("express");
const router = express.Router();

// Helpers
const helpers = require("../helpers/auth");

const parameter_controller = require("../controllers/parameter.controller");

router.get('/',helpers.isAuthenticated,helpers.validatePermision,parameter_controller.index)

router.get('/render/:view/:id*?',helpers.isAuthenticated,parameter_controller.renderIndex)

router.post("/getAll",helpers.isAuthenticated, parameter_controller.getAll);

router.post("/create",helpers.isAuthenticated, parameter_controller.create);

router.post("/edit",helpers.isAuthenticated, parameter_controller.update);

router.post("/delete",helpers.isAuthenticated, parameter_controller.deleteItem);

router.get('/token',helpers.isAuthenticated,parameter_controller.token)

module.exports = router;
