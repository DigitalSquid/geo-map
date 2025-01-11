import { useState, useEffect } from 'react';
import { filters } from './constants/filters';
import { countryData } from './constants/countryData';

import Map from './components/map/map';
import FilterList from './components/filterList/filterList';
import CountryList from './components/countryList/countryList';

// import Functions from './functions';

import './App.css';

/// Could be better than useState - https://react.dev/reference/react/useReducer

function App() {
  const [selectedFilters, setSelectedFilters] = useState({ filters });
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [highlightedCountryId, setHighlightedCountryId] = useState(null);

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

  function resetFilters() {
    const newFilters = { ...selectedFilters };

    Object.entries(newFilters.filters).forEach((entry) => {
      const filterData = entry[1];
      if (filterData.selected !== '') {
        filterData.selected = '';
      }
    });

    setSelectedFilters(newFilters);
    filterCountries(newFilters);
  }

  function highlightCountry(countryId) {
    setHighlightedCountryId(countryId);
  }

  useEffect(() => {
    filterCountries(selectedFilters);
  }, [selectedFilters]);

  return (
    <div className='App'>
      <main>
        <div className='sidebar'>
          <header className='App-header'>Geo Meta Map</header>
          <FilterList
            selectedFilters={selectedFilters}
            togglePreference={togglePreference}
            resetPreference={resetPreference}
          />
          <div className='sidebar-end'>
            <button onClick={resetFilters}>Reset filters</button>
          </div>
        </div>

        <Map
          filteredCountries={filteredCountries}
          highlightedCountryId={highlightedCountryId}
        />
        <CountryList
          filteredCountries={filteredCountries}
          highlightCountry={highlightCountry}
        />
      </main>
    </div>
  );
}

export default App;
