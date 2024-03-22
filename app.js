const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const { success, getUniqueID } = require("./helper.js");
let pokemons = require("./mock-pokemon");

const app = express();
const port = 3000;

const logger = (req, res, next) => {
  console.log(`URL:${req.url}`);
  next();
};
app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json());

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

//--- Ajout d'un pokémon ---//
app.post("/api/pokemons", (req, res) => {
  const id = getUniqueID(pokemons);
  const pokemonCreated = {
    ...req.body,
    ...{ id: id, created: new Date() },
  };
  pokemons.push(pokemonCreated);
  const message = `Le pokémon ${pokemonCreated.name} à bien été créé.`;
  res.json(success(message, pokemonCreated));
});

app.put("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemonUpdated = { ...req.body, id: id };
  pokemons = pokemons.map((pokemon) => {
    return pokemons.id === id ? pokemonUpdated : pokemon;
  });
  const message = `Le pokemon ${pokemonUpdated.name} a bien été modifié.`;
  res.json(success(message, pokemonUpdated));
});

app.listen(port, () =>
  console.log(
    `Notre application Node est démarrée sur : http://localhost:${port}`
  )
);
