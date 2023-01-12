const exp = require("express");
const router = exp.Router();
const authController = require("../controller/authenticate");
const { checkLogin, auth, adminCheck } = require("../middleware/authenticate");

router.post("/user-signup", authController.signUp);
router.post("/user-signin", authController.signIn);
router.post("/user", checkLogin, auth, adminCheck, authController.users);

module.exports = router;