const express = require("express");
const router = express.Router();

// Helpers
const { isAuthenticated } = require("../helpers/auth");


// Controllers
const schedule_controller = require("../controllers/shedule.controller");

router.post("/getAppointment",isAuthenticated, schedule_controller.getAppointment);

router.get('/renderAppointment',isAuthenticated,schedule_controller.renderAppointment)

router.get('/program',isAuthenticated,schedule_controller.renderProgramSchedule)

router.post('/generate',schedule_controller.generateSchedule)

router.post('/save',schedule_controller.saveSchedule)

router.post('/report',isAuthenticated,schedule_controller.appointmentReport)

module.exports = router;
