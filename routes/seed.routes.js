const express = require("express");
const router = express.Router();

// Helpers
const { isAuthenticated } = require("../helpers/auth");

//Controller
const seed_controller = require("../controllers/seed.controller");

router.get('/',isAuthenticated,seed_controller.index)

router.get('/render/:view/:id*?',isAuthenticated,seed_controller.renderIndex)

router.post("/get_all",isAuthenticated, seed_controller.getAll);

router.post("/update",isAuthenticated, seed_controller.updateCollection);

router.post("/edit",isAuthenticated, seed_controller.update);

router.post("/delete",isAuthenticated, seed_controller.deleteItem);

module.exports = router;
