import './App.css';
import React, { useState, useEffect } from "react";

function CountryCard({ name, flag }) {
  return (
    <div className="countryCard">
      <img src={flag} alt={`${name} Flag`} />
      <h3>{name}</h3>
    </div>
  );
}

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(term)
    );
    setFilteredCountries(filtered);
  };

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search countries..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="countries-container">
        {filteredCountries.map((country, index) => (
          <CountryCard
            key={index}
            name={country.name.common}
            flag={country.flags.png}
          />
        ))}
      </div>
    </div>
  );
}

export default App;