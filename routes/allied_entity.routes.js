const express = require("express");
const router = express.Router();

// Helpers
const helpers = require("../helpers/auth");

//Controller
const allied_entity_controller = require("../controllers/allied_entity.controller");

router.get('/',helpers.isAuthenticated,helpers.validatePermision,allied_entity_controller.index)

router.get('/render/:view/:id*?',helpers.isAuthenticated,allied_entity_controller.renderIndex)

router.post("/getAll",helpers.isAuthenticated, allied_entity_controller.getAll);

router.post("/create",helpers.isAuthenticated, allied_entity_controller.create);

router.post("/edit",helpers.isAuthenticated, allied_entity_controller.update);

router.post("/delete",helpers.isAuthenticated, allied_entity_controller.deleteItem);

module.exports = router;
