const express = require("express");
const cors = require("cors");
const path = require("path");
const { evaluate } = require("./backend/evaluator");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend")));

app.post("/evaluate", async (req, res) => {
  const { query, appName } = req.body;
  if (!query || !appName) {
    return res.status(400).json({ error: "query and appName are required" });
  }
  const result = await evaluate(query, appName);
  res.json(result);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
