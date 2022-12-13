const login = require("../controller/loginController");
const register = require("../controller/registerController");
const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;
