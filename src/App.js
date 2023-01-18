import { useState, useEffect } from 'react';
import { filters } from './constants/filters';
import { countryData } from './constants/countryData';

import Map from './components/map/map';
import MapFilters from './components/mapFilters/mapFilters';
import CountryList from './components/countryList/countryList';

import './App.css';

function App() {
  const [selectedFilters, setSelectedFilters] = useState({ filters });
  const [filteredCountries, setFilteredCountries] = useState([]);

  function filterCountries(selectedFilters) {
    const newFilteredCountries = Object.entries(countryData).filter(
      (country) => {
        const countryData = country[1];
        let matchesFilter = [];

        Object.entries(selectedFilters.filters).forEach((entry) => {
          const filterName = entry[0];
          const filterData = entry[1];

          if (filterData.selected === '') {
            return;
          }

          const countryFilterData = countryData.attributes[filterName];
          let selectedFilterValue = filterData.selected.toLowerCase();

          function isNumeric(str) {
            if (typeof str !== 'string') return false;
            return !isNaN(str) && !isNaN(parseFloat(str));
          }

          selectedFilterValue = isNumeric(selectedFilterValue)
            ? Number(selectedFilterValue)
            : selectedFilterValue;

          matchesFilter.push(
            Array.isArray(countryFilterData)
              ? countryFilterData.includes(selectedFilterValue)
              : countryFilterData === selectedFilterValue
          );
        });

        return !matchesFilter.includes(false);
      }
    );
    setFilteredCountries(newFilteredCountries);
  }

  function togglePreference(filterName, value) {
    const newFilters = { ...selectedFilters };
    newFilters.filters[filterName].selected = value;
    setSelectedFilters(newFilters);
    filterCountries(newFilters);
  }

  function resetPreference(filterName, value) {
    if (selectedFilters.filters[filterName].selected !== value) {
      return;
    }
    const newFilters = { ...selectedFilters };
    newFilters.filters[filterName].selected =
      newFilters.filters[filterName].selected === value ? '' : value;
    setSelectedFilters(newFilters);
    filterCountries(newFilters);
  }

  useEffect(() => {
    filterCountries(selectedFilters);
  }, []);

  return (
    <div className='App'>
      <main>
        <div className='sidebar'>
          <header className='App-header'>Geo Map</header>
          <MapFilters
            selectedFilters={selectedFilters}
            togglePreference={togglePreference}
            resetPreference={resetPreference}
          />
        </div>

        <Map filteredCountries={filteredCountries} />
        <CountryList filteredCountries={filteredCountries} />
      </main>
    </div>
  );
}

export default App;
