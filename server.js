// server.js
const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 4000;

// ---- CONFIGURATION ----
// Replace these with your actual Softr values:
const SOFTR_API_KEY = "c7f2qRxiCJnPXERC8Z05sAhBG";
const DATABASE_ID  = "e00c8ae5-cfe7-4153-9793-83a6416fcc9d";
const TABLE_ID     = "NCaK48mRamBFVx";

app.get("/tasks", async (req, res) => {
  try {
    const url = `https://tables-api.softr.io/api/v1/databases/${DATABASE_ID}/tables/${TABLE_ID}/records`;
    const response = await axios.get(url, {
      headers: {
        "Softr-Api-Key": SOFTR_API_KEY,
        // If required, maybe also domain header — depending on your Softr setup
      },
      params: {
        limit: 1000  // adjust as needed
      }
    });

    const data = response.data.data;  // array of records
    // Optionally transform data: extract fields etc.
    const clean = data.map(r => ({
      id: r.id,
      // r.fields contains your columns
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
