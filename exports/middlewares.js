const locals = require("../middlewares/locals");
const addReqUser = require("../middlewares/addReqUser");
const isUnauthorized = require("../middlewares/isUnauthorized");
const isAuthenticated = require("../middlewares/isAuthenticated");

module.exports = { locals, addReqUser, isAuthenticated, isUnauthorized }