import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    // Fetch all countries on initial render
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch('https://crio-location-selector.onrender.com/countries');
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const fetchStates = async (countryName) => {
    try {
      const response = await fetch(`https://crio-location-selector.onrender.com/country=${countryName}/states`);
      const data = await response.json();
      setStates(data);
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  const fetchCities = async (countryName, stateName) => {
    try {
      const response = await fetch(`https://crio-location-selector.onrender.com/country=${countryName}/state=${stateName}/cities`);
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleCountryChange = (e) => {
    const countryName = e.target.value;
    setSelectedCountry(countryName);
    setSelectedState('');
    setSelectedCity('');
    fetchStates(countryName);
  };

  const handleStateChange = (e) => {
    const stateName = e.target.value;
    setSelectedState(stateName);
    setSelectedCity('');
    fetchCities(selectedCountry, stateName);
  };

  const handleCityChange = (e) => {
    const cityName = e.target.value;
    setSelectedCity(cityName);
  };

  return (
    <div className='city-selector'>
      <h1>Select Location</h1>
      <select value={selectedCountry} onChange={handleCountryChange} className='dropdown'>
        <option value="">Select Country</option>
        {countries.map(country => (
          <option key={country} value={country}>{country}</option>
        ))}
      </select>
      <select value={selectedState} onChange={handleStateChange} disabled={!selectedCountry} className='dropdown'>
        <option value="">Select State</option>
        {states.map(state => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>
      <select value={selectedCity} onChange={handleCityChange} disabled={!selectedState}className='dropdown'>
        <option value="">Select City</option>
        {cities.map(city => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
      {selectedCity && (
        <h2 className="result">

        You selected <span className="highlight">{selectedCity}</span>,
        
        <span className="fade">
        
        {selectedState}, {selectedCountry}
        
        </span>
        
        </h2>
      )}
    </div>
  );
}

export default App;
