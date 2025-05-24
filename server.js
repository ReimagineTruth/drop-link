require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 8080;
const API_KEY = process.env.PI_API_KEY;
const PI_API = "https://api.minepi.com/v2";

app.use(express.json());

// Verify Pioneer using accessToken
app.post('/pi/verify', async (req, res) => {
  const { accessToken } = req.body;
  try {
    const response = await axios.get(`${PI_API}/me`, {
      headers: { authorization: `Bearer ${accessToken}` }
    });
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message });
  }
});

// Approve payment on server
app.post('/pi/approve', async (req, res) => {
  const { paymentId } = req.body;
  try {
    const response = await axios.post(`${PI_API}/payments/${paymentId}/approve`, null, {
      headers: { authorization: `Key ${API_KEY}` }
    });
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message });
  }
});

// Complete payment on server
app.post('/pi/complete', async (req, res) => {
  const { paymentId, txid } = req.body;
  try {
    const response = await axios.post(`${PI_API}/payments/${paymentId}/complete`, { txid }, {
      headers: { authorization: `Key ${API_KEY}` }
    });
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
