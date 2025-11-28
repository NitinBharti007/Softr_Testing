require('dotenv').config();
const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors"); 
const PORT = process.env.PORT || 4000;

const SOFTR_API_KEY = process.env.SOFTR_API_KEY;
const DATABASE_ID    = process.env.DATABASE_ID;
const TABLE_ID       = process.env.TABLE_ID;

app.use(cors());
app.get("/tasks", async (req, res) => {
  try {
    const url = `https://tables-api.softr.io/api/v1/databases/${DATABASE_ID}/tables/${TABLE_ID}/records`;
    const response = await axios.get(url, {
      headers: {
        "Softr-Api-Key": SOFTR_API_KEY,
      },
      params: {
        limit: 1000
      }
    });
    const data = response.data.data;
    const clean = data.map(r => ({
      id: r.id,
      ...r.fields
    }));
    res.json({ success: true, records: clean });
  } catch (err) {
    console.error("Error fetching from Softr:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
