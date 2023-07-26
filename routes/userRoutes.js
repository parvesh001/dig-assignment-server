const {
  signup,
  login,
  protect,
  updateMe,
  deactivateMe,
  getAll,
} = require("../controllers/userController");

const router = require("express").Router();

router.post('/', signup);
router.post("/login", login);

router.use(protect);
router.get('/', getAll);
router.patch("/updateMe", updateMe);
router.delete("/deactivateMe", deactivateMe);

module.exports = router;

