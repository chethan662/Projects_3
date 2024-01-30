import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = () => {
    fetch('https://crio-location-selector.onrender.com/countries')
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.error('Error fetching countries:', error));
  };

  const fetchStates = (countryName) => {
    fetch(`https://crio-location-selector.onrender.com/country=${countryName}/states`)
      .then(response => response.json())
      .then(data => setStates(data))
      .catch(error => console.error('Error fetching states:', error));
  };

  const fetchCities = (countryName, stateName) => {
    fetch(`https://crio-location-selector.onrender.com/country=${countryName}/state=${stateName}/cities`)
      .then(response => response.json())
      .then(data => setCities(data))
      .catch(error => console.error('Error fetching cities:', error));
  };

  const handleCountryChange = event => {
    const countryName = event.target.value;
    setSelectedCountry(countryName);
    setSelectedState('');
    setSelectedCity('');
    setStates([]);
    setCities([]);
    if (countryName) {
      fetchStates(countryName);
    }
  };

  const handleStateChange = event => {
    const stateName = event.target.value;
    setSelectedState(stateName);
    setSelectedCity('');
    setCities([]);
    if (stateName) {
      fetchCities(selectedCountry, stateName);
    }
  };

  const handleCityChange = event => {
    setSelectedCity(event.target.value);
  };

  return (
    <div>
      <h1>Select Location</h1>
      <select value={selectedCountry} onChange={handleCountryChange}>
        <option value="" disabled>Select Country</option>
        {countries.map(country => (
          <option key={country.code} value={country.name}>{country.name}</option>
        ))}
      </select>
      <select value={selectedState} onChange={handleStateChange} disabled={!selectedCountry}>
        <option value="" disabled>Select State</option>
        {states.map(state => (
          <option key={state.code} value={state.name}>{state.name}</option>
        ))}
      </select>
      <select value={selectedCity} onChange={handleCityChange} disabled={!selectedState}>
        <option value="" disabled>Select City</option>
        {cities.map(city => (
          <option key={city.code} value={city.name}>{city.name}</option>
        ))}
      </select>
      <div>
        {selectedCity && (
          <p>You selected {selectedCity}, {selectedState}, {selectedCountry}</p>
        )}
      </div>
    </div>
  );
}

export default App;
