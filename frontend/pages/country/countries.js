import Link from 'next/link';

function CountryList({ countries }) {
  if (!countries || countries.length === 0) {
    return <div>No countries available.</div>;
  }

  return (
    <div>
      <h1>Countries</h1>
      <ul>
        {countries.map((country) => (
          <li key={country.code}>
            <Link href={`/CountryInfo/${country.code}`}>
              <a>{country.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CountryList;
