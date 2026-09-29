const express = require("express");
const { getJson } = require("serpapi");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

app.get("/apps", async (req, res) => {
  try {
    const { q = "car", page = 1, next_page_token } = req.query;

    const params = {
      engine: "google_play",
      q,
      hl: "es",
      gl: "mx",
      store: "apps",
      api_key: process.env.SERP_API_KEY,
    };

    if (page > 1 && next_page_token) params.next_page_token = next_page_token;

    const response = await getJson(params);
    const items = response.organic_results?.[0]?.items ?? [];

    res.json({
      items,
      next_page_token: response.serpapi_pagination?.next_page_token ?? null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error consultando SerpAPI" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(Servidor corriendo en http://localhost:)
);
