"use strict";

require("dotenv").config();
const express = require("express");
const { engine } = require("express-handlebars");
const session = require("express-session")
const multer = require("multer");
const flash = require("connect-flash");
const path = require("path");

const { Pokemon, PokemonType, Region, User } = require("./exports/models")
const { auth, home, pokemon, regions, types, notFound } = require("./exports/routes");
const { sequelize, imgStorage } = require("./exports/utils");
const { locals, addReqUser, isUnauthorized } = require("./exports/middlewares");

const app = express();
const port = process.env.PORT || 5000;

app.engine(
  "hbs",
  engine({
    layoutsDir: "views/layouts",
    defaultLayout: "pokedex-layout",
    extname: "hbs",
    helpers: { equal: (a, b) => a === b, json: (obj) => JSON.stringify(obj) },
  })
);

app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(multer({ storage: imgStorage }).single("image"));
app.use(session({ secret: "mysecret", resave: true, saveUninitialized: false }));
app.use(flash());
app.use(addReqUser);
app.use(locals);
app.use(auth);
app.use("/pokemon", isUnauthorized, home);
app.use("/admin-pokemon", isUnauthorized, pokemon);
app.use("/admin-regions", isUnauthorized, regions);
app.use("/admin-types", isUnauthorized, types);
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
