const natural = require("natural");
const stopword = require("stopword");

function clean(text) {
  const words = text.toLowerCase().split(/\W+/);
  return stopword.removeStopwords(words);
}

function similarity(query, description) {
  const q = clean(query).join(" ");
  const d = clean(description).join(" ");
  return natural.JaroWinklerDistance(q, d) * 100;
}

function detectQueryType(query) {
  if (query.split(" ").length <= 2) return "Ambiguous";
  if (query.toLowerCase().includes("app")) return "Functional";
  return "Functional";
}

module.exports = { similarity, detectQueryType };
