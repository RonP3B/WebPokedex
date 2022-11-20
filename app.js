"use strict";

require("dotenv").config();
const express = require("express");
const { engine } = require("express-handlebars");
const equal = require("./util/helpers/hbs/equal");
const path = require("path");
const sequelize = require("./util/databaseObj");
const Pokemon = require("./models/Pokemon");
const PokemonType = require("./models/PokemonType");
const Region = require("./models/Region");
const { home, pokemon, regions, types, notFound } = require("./routes/index");

const app = express();
const port = process.env.PORT || 5000;

app.engine(
  "hbs",
  engine({
    layoutsDir: "views/layouts",
    defaultLayout: "pokedex-layout",
    extname: "hbs",
    helpers: { equal },
  })
);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(home);
app.use("/admin-pokemon", pokemon);
app.use("/admin-regions", regions);
app.use("/admin-types", types);
app.use(notFound);

Pokemon.belongsTo(PokemonType, { constraint: true, onDelete: "CASCADE" });
Pokemon.belongsTo(Region, { constraint: true, onDelete: "CASCADE" });
PokemonType.hasMany(Pokemon);
Region.hasMany(Pokemon);

sequelize
  .sync()
  .then(() => {
    app.listen(port, () => console.log(`Listening on ${port}`));
  })
  .catch((err) => {
    console.log(err);
  });
