import express from 'express';
import cors from 'cors';
import axios from 'axios';


const app = express();

//middlewares
app.use(express.json());
app.use(cors());

//currencies
app.get("/currencies", async (req, res) => {
    try {
      const nameURL = "https://openexchangerates.org/api/currencies.json?app_id=4d7a2cd317be4ec99790d17bcbb3484a";
      console.log("Fetching from:", nameURL);
      const nameResponse = await axios.get(nameURL);
      const nameData = nameResponse.data;
      console.log("Currency data:", nameData);
      return res.json(nameData);
    } catch (err) {
      console.error("Error fetching currencies:", err.message);
      return res.status(500).json({ error: "Failed to fetch currencies" });
    }
  });

  app.get("/convert", async (req, res) => {
    const { date, sourceCurrency, targetCurrency, ammountInSourceCurrency } = req.query;
    
    try {
      // Use latest endpoint instead of historical for recent/future dates
      const dataUrl = `https://openexchangerates.org/api/latest.json?app_id=4d7a2cd317be4ec99790d17bcbb3484a`;
      console.log("Fetching from:", dataUrl);
      
      const dataResponse = await axios.get(dataUrl);
      const rates = dataResponse.data.rates;
      
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
      return res.status(500).json({ error: "Failed to convert currency", details: err.message });
    }
  });

//listen to a port
app.listen(5001, () => {
    console.log("SERVER STARTED ON PORT 5001");
  });