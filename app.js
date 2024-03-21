const express = require("express");
const { success } = require("./helper.js");
let pokemons = require("./mock-pokemon");

const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello World "));

app.get("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = pokemons.find((pokemon) => pokemon.id === id);
  const message = "Un pokémon est bien trouvé";
  res.json(success(message, pokemon));
});

app.get("/api/pokemons", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = pokemons.length;
  res.send(`Il y a ${pokemon}, dans votre pokédex pour le moment`);
});

app.get("/api/pokemonsList", (req, res) => {
  const message = "Voici la liste des pokémons";
  res.json(success(message, pokemons));
});

app.listen(port, () =>
  console.log(
    `Notre application Node est démarrée sur : http://localhost:${port}`
  )
);
