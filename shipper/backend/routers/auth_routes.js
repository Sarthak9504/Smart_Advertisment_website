const express = require("express");
const { signup, login, verifyToken } = require("../controllers/auth_controller");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/verify-token", verifyToken);

module.exports = router;
