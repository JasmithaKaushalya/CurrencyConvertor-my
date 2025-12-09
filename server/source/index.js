import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();

// Get API key from environment variable
const API_KEY = process.env.OPEN_EXCHANGE_API_KEY;

// Middlewares
app.use(express.json());
app.use(cors());

// Currencies endpoint
app.get("/currencies", async (req, res) => {
  try {
    const nameURL = `https://openexchangerates.org/api/currencies.json?app_id=${API_KEY}`;
    console.log("Fetching currencies...");
    const nameResponse = await axios.get(nameURL);
    return res.json(nameResponse.data);
  } catch (err) {
    console.error("Error fetching currencies:", err.message);
    return res.status(500).json({ error: "Failed to fetch currencies" });
  }
});

// Convert endpoint
app.get("/convert", async (req, res) => {
  const { date, sourceCurrency, targetCurrency, ammountInSourceCurrency } = req.query;
  
  try {
    const dataUrl = `https://openexchangerates.org/api/latest.json?app_id=${API_KEY}`;
    console.log("Converting currency...");
    const dataResponse = await axios.get(dataUrl);
    const rates = dataResponse.data.rates;
    
    if (!rates[sourceCurrency] || !rates[targetCurrency]) {
      return res.status(400).json({ error: "Invalid currency code" });
    }
    
    const sourceRate = rates[sourceCurrency];
    const targetRate = rates[targetCurrency];
    const convertedAmount = (ammountInSourceCurrency / sourceRate) * targetRate;
    
    return res.json({
      convertedAmount: convertedAmount.toFixed(2),
      sourceCurrency,
      targetCurrency,
      date
    });
  } catch (err) {
    console.error("Conversion error:", err.message);
    return res.status(500).json({ 
      error: "Failed to convert currency", 
      details: err.message 
    });
  }
});

app.listen(5001, () => {
  console.log("SERVER STARTED ON PORT 5001");
});