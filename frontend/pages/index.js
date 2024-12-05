import axios from 'axios';
import Link from 'next/link';

const Home = ({ countries }) => (
  <div>
    <h1>Available Countries</h1>
    {countries && countries.length > 0 ? (
      <ul>
        {countries.map((country) => (
          <li key={country.countryCode}>
            <Link href={`/CountryInfo/${country.countryCode}`}> 
              {country.name}
            </Link>
          </li>
        ))}
      </ul>
    ) : (
      <p>No countries available.</p>
    )}
  </div>
);

export async function getStaticProps() {
  try {
    const response = await axios.get('http://localhost:5000/api/available-countries');
    return { props: { countries: response.data } };
  } catch (error) {
    console.error("Failed to fetch countries:", error);
    return { props: { countries: [] } };
  }
}

export default Home;
