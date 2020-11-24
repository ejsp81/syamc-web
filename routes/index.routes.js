const express = require("express");
const router = express.Router();

// Helpers
const { isAuthenticated } = require("../helpers/auth");


// Controllers
const { renderIndex} = require("../controllers/index.controller");

router.get("/",isAuthenticated, renderIndex);

module.exports = router;
