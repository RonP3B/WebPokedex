const express = require("express");
const notFoundController = require("../controllers/notFoundController");

const router = express.Router();

router.get("*", notFoundController.getNotFound);

module.exports = router;
