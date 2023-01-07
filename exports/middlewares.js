const locals = require("../middlewares/locals");
const isUnauthorized = require("../middlewares/isUnauthorized");
const isAuthenticated = require("../middlewares/isAuthenticated");

module.exports = { locals, isAuthenticated, isUnauthorized }