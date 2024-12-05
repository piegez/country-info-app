const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOptions));  

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

// Rotas
app.get('/api/available-countries', async (req, res) => {
  try {
    const response = await axios.get('https://date.nager.at/api/v3/AvailableCountries');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch available countries' });
  }
});

app.get('/api/CountryInfo/:countryCode', async (req, res) => {  
  const { countryCode } = req.params;

  try {
    const [borderResponse, populationResponse, flagResponse] = await Promise.all([
      axios.get(`https://date.nager.at/api/v3/CountryInfo/${countryCode}`),
      axios.post('https://countriesnow.space/api/v0.1/countries/population', { country: countryCode }),
      axios.post('https://countriesnow.space/api/v0.1/countries/flag/images', { country: countryCode }),
    ]);

    res.json({
      borders: borderResponse.data.borders,
      population: populationResponse.data.data.populationCounts,
      flag: flagResponse.data.data.flag,
    });
  } catch (error) {
    console.error('Error fetching country info:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch country information' });
  }
});
