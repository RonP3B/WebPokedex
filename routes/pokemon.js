const express = require("express");
const pokemonController = require("../controllers/pokemonController");

const router = express.Router();

router.get("", pokemonController.getPokemon);
router.get("/add", pokemonController.getAddPokemon);
router.get("/edit/:id", pokemonController.getEditpokemon);
router.get("/delete/:id", pokemonController.getDeletePokemon);
router.post("/add", pokemonController.postAddPokemon);
router.post("/edit", pokemonController.postEditPokemon);
router.post("/delete", pokemonController.postDeletePokemon);

module.exports = router;
