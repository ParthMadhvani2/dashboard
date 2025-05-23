const express = require("express");
const cors = require("cors");
const { customers } = require("./data/customers");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/api/customers", (req, res) => {
  try {
    setTimeout(() => {
      res.json({ customers });
    }, 500);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch customers" });
  }
});

app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
