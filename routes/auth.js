const express = require("express");
const authController = require("../controllers/authController");
const isAuthenticated = require("../middlewares/isAuthenticated")

const router = express.Router();

router.get("", isAuthenticated, authController.getLogin);
router.get("/sign-up", isAuthenticated, authController.getSignup);
router.get("/log-out", authController.getLogout);
router.get("/forgot-password/find-user", authController.getFindUser);
router.get("/forgot-password/confirm-code", authController.getConfirmCode);
router.get("/forgot-password/reset-password", authController.getResetPassword);

router.post("/forgot-password/find-user", authController.postFindUser);
router.post("/forgot-password/confirm-code", authController.postConfirmCode);
router.post("/forgot-password/reset-password", authController.postResetPassword);
router.post("/sign-up", authController.postSignup);
router.post("/", authController.postLogin);

module.exports = router;
