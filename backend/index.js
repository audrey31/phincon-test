const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Fetch Pokemon list
app.get("/api/pokemon", async (req, res) => {
  try {
    const limit = req.query.limit || 10000;
    const offset = req.query.offset || 0;
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching Pokemon list", error: error.message });
  }
});

// Fetch Pokemon details
app.get("/api/pokemon/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${req.params.id}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching Pokemon details",
      error: error.message,
    });
  }
});

// Catch Pokemon API
app.get("/api/catch", (req, res) => {
  const probability = Math.random() < 0.5;
  res.json({ success: probability });
});

// Release Pokemon API
app.post("/api/release", (req, res) => {
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  const isPrime = (num) => {
    for (let i = 2; i < num; i++) if (num % i === 0) return false;
    return num > 1;
  };
  res.json({ success: isPrime(randomNumber), number: randomNumber });
});

// Rename Pokemon API
app.post("/api/rename", (req, res) => {
  const { name, count } = req.body;
  const fibonacci = (n) => {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  };
  const newName = `${name}-${fibonacci(count)}`;
  res.json({ name: newName });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
