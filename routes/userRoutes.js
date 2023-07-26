const { signup, login } = require("../controllers/userController");

const router = require("express").Router();

router.route("/").get().post(signup);
router.post("/login", login);

module.exports = router;
