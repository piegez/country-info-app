

const axios = require('axios');

const getCountryInfo = async (countryCode) => {
  try {

    const response = await axios.get(`https://restcountries.com/v3.1/all`);

    const country = response.data.find(
      (c) => c.cca2.toLowerCase() === countryCode.toLowerCase()
    );

    if (!country) {
      throw new Error(`Country not found: ${countryCode}`);
    }

    const { name, flags, borders, population } = country;


    return {
      name: name.common,
      flagUrl: flags[0], 
      borders: borders || [],
      populationData: [
        { year: 2020, population }, 
      ],
    };
  } catch (error) {
    console.error('Error fetching country data:', error);
    throw error;
  }
};

module.exports = {
  getCountryInfo,
};
