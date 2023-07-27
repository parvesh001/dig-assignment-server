const {
  signup,
  login,
  protect,
  updateMe,
  deactivateMe,
  getAll,
  getSuggestions,
} = require("../controllers/userController");

const router = require("express").Router();

router.post('/', signup);
router.post("/login", login);

router.use(protect);
router.get('/', getAll);
router.get('/suggestions', getSuggestions)
router.patch("/updateMe", updateMe);
router.delete("/deactivateMe", deactivateMe);

module.exports = router;

