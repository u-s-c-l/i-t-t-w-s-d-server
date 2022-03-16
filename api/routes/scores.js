const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/auth");

const userController = require("../controllers/score");

router.get("/", verifyToken, userController.index);
router.get("/username/:username", verifyToken, userController.findByUsername);
router.get("/cat/:cat", verifyToken, userController.findByCategory);
router.get(
  "/username/:username/cat/:cat",
  verifyToken,
  userController.findByUsernameAndCat
);
router.get("/leadersboard", verifyToken, userController.returnLeadersBoard);
router.post("/post", verifyToken, userController.updateInsert);
router.delete("/username/:username", verifyToken, userController.destroy);

module.exports = router;
