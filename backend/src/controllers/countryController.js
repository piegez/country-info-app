const fetch = require('node-fetch');


const getAvailableCountries = async () => {
    try {
        const response = await fetch('https://date.nager.at/api/v3/AvailableCountries');
        const data = await response.json();
        return data; 
    } catch (error) {
        throw new Error('Error fetching available countries');
    }
};


const getCountryInfo = async (countryCode) => {
    try {        const countryResponse = await fetch(`https://date.nager.at/api/v3/CountryInfo/${countryCode}`);
        const countryData = await countryResponse.json();


        const populationResponse = await fetch('https://countriesnow.space/api/v0.1/countries/population');
        const populationData = await populationResponse.json();


        const flagResponse = await fetch('https://countriesnow.space/api/v0.1/countries/flag/images');
        const flagData = await flagResponse.json();


        const flag = flagData.data.find((f) => f.iso3 === countryCode)?.flag || '/default-flag.png'; 


        const borders = countryData.borders.map((border) => {
            return {
                countryCode: border.countryCode,
                name: border.commonName || 'Unknown', 
            };
        });


        const population = populationData.data.find((c) => c.iso3 === countryCode)?.populationCounts || [];

        return {
            name: countryData.commonName,
            flagUrl: flag,
            borders: borders,
            populationData: population,
        };
    } catch (error) {
        console.error('Error fetching country info:', error);
        throw new Error('Error fetching country info');
    }
};

module.exports = { getAvailableCountries, getCountryInfo };
