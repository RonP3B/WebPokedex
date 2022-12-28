const auth = require("../routes/auth")
const home = require("../routes/home");
const notFound = require("../routes/notFound");
const pokemon = require("../routes/pokemon");
const regions = require("../routes/regions");
const types = require("../routes/types");

module.exports = { home, notFound, pokemon, regions, types, auth };
