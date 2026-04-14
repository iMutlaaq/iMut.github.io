const axios = require("axios");
const cheerio = require("cheerio");

async function fetchAppData(appName) {
  try {
    const url = `https://apps.apple.com/us/search?term=${encodeURIComponent(appName)}`;
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    const app = $("a[href*='/app/']").first();
    const title = app.find("h3").text();
    const link = app.attr("href");

    if (!link) return null;

    const appPage = await axios.get(link);
    const $$ = cheerio.load(appPage.data);

    const description = $$(".section__description").text();

    return {
      name: title,
      description: description || ""
    };

  } catch (e) {
    return null;
  }
}

module.exports = { fetchAppData };
