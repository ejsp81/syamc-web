const router = require("express").Router();

const userController = require("../controllers/users.controller");

// Routes
router.get("/", userController.index);

router.get('/render/:view/:id*?',userController.renderIndex)

router.get("/login", userController.renderLoginForm);

router.post("/login", userController.login);

router.get("/logout", userController.logout);

router.post("/create_allied", userController.createAllied);

router.post("/edit", userController.edit);

router.get("/signup", userController.renderSingUpForm);

router.post("/get_users", userController.getUsers);


module.exports = router;
