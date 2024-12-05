const countryService = require('../services/countryService');

const getCountryInfo = async (req, res) => {
  const { countryCode } = req.params;
  try {
    const countryInfo = await countryService.getCountryInfo(countryCode);


    if (!countryInfo) {
      return res.status(404).json({ message: `Country info for ${countryCode} not found` });
    }

    const updatedFlagUrl = countryInfo.flag || 'default-flag-url'; 

    const updatedPopulationData = Array.isArray(countryInfo.populationData) ? countryInfo.populationData : [];

    const updatedBorders = Array.isArray(countryInfo.borders) ? countryInfo.borders.map(border => ({
      countryCode: border.countryCode,  
      name: border.name || 'Unknown',   
    })) : [];

    res.json({
      ...countryInfo,
      flagUrl: updatedFlagUrl, 
      populationData: updatedPopulationData,
      borders: updatedBorders,
    });
  } catch (error) {
    console.error('Error fetching country info:', error);
    res.status(500).json({ message: 'Error fetching country info' });
  }
};

module.exports = { getCountryInfo };
