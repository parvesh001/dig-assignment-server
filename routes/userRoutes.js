const { signup } = require("../controllers/userController");

const router = require("express").Router();

router.route("/").get().post(signup);

module.exports = router;
