const {
  signup,
  login,
  protect,
  updateMe,
  deactivateMe,
} = require("../controllers/userController");

const router = require("express").Router();

router.route("/").get().post(signup);
router.post("/login", login);

router.use(protect);
router.patch("/updateMe", updateMe);
router.delete("/deactivateMe", deactivateMe);

module.exports = router;
