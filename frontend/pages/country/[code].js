import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

const CountryInfo = ({ countryInfo, error }) => {
    if (error) {
        return <div>{error}</div>;  
    }

    if (!countryInfo) {
        return <div>Country not found or failed to fetch data.</div>;
    }

    return (
        <div>
            <h1>{countryInfo.name}</h1>
            <img src={countryInfo.flag} alt={`${countryInfo.name} Flag`} width="200" />
            <h2>Border Countries</h2>
            <ul>
                {countryInfo.borders && countryInfo.borders.length > 0 ? (
                    countryInfo.borders.map((border) => (
                        <li key={border}>{border}</li>
                    ))
                ) : (
                    <li>No border countries available.</li>
                )}
            </ul>

            <h2>Population Over Time</h2>
            {countryInfo.population && countryInfo.population.length > 0 ? (
                <LineChart width={600} height={300} data={countryInfo.population}>
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
            ) : (
                <p>No population data available.</p>
            )}
        </div>
    );
};

export async function getServerSideProps(context) {
    const { countryCode } = context.params;
  
    if (!countryCode) {
      return { notFound: true };
    }
  
    try {
      const response = await axios.get(`http://localhost:5000/api/CountryInfo/${countryCode}`);
      
      const countryInfo = response.data;
      if (!countryInfo || !countryInfo.name) {
        return { notFound: true };
      }
      
      return { props: { countryInfo } };
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
      return { notFound: true }; 
    }
  }
  

export default CountryInfo;
