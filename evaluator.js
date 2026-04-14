const { fetchAppData } = require("./fetcher");
const { similarity, detectQueryType } = require("./analyzer");

function getRating(score) {
  if (score >= 85) return "Excellent";
  if (score >= 65) return "Good";
  if (score >= 35) return "Acceptable";
  return "Off Topic";
}

function applyRules(type, score) {
  if (type === "Complex" && score > 70) return 70;
  if (type === "Ambiguous" && score > 80) return 75;
  return score;
}

function generateComment(type, rating, score) {
  return `The query type is ${type}.
The system analyzed the app based on its real description and calculated a match score of ${Math.round(score)}%.
The app relevance is evaluated as ${rating}.
Therefore, the result relevancy is ${rating}.`;
}

async function evaluate(query, appName) {
  // RESET enforced (fresh call)

  const appData = await fetchAppData(appName);

  if (!appData) {
    return { error: "App data not found" };
  }

  const type = detectQueryType(query);
  let score = similarity(query, appData.description);

  score = applyRules(type, score);

  const rating = getRating(score);
  const comment = generateComment(type, rating, score);

  return {
    queryType: type,
    score: Math.round(score),
    rating,
    app: appData.name,
    comment
  };
}

module.exports = { evaluate };
