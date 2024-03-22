const pokemons = require("./mock-pokemon");

exports.success = (message, data) => {
  return { message, data };
};

exports.getUniqueID = (pokemons) => {
  const pokemonsIds = pokemons.map((pokemon) => pokemon.id);
  const maxId = pokemonsIds.reduce((a, b) => Math.max(a, b));
  const uniqueId = maxId + 1;

  return uniqueId;
};
