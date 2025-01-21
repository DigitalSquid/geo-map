'use client';

import { useState, useEffect } from 'react';
import { filters } from '@/data/filters';
import { countryData } from '@/data/countryData';

import Map from '@/app/components/map';
import FilterList from '@/app/components/filterList';
import CountryList from '@/app/components/countryList';

export default function Home() {
  const [selectedFilters, setSelectedFilters] = useState<any>({ filters });
  const [filteredCountries, setFilteredCountries] = useState<Array<any>>([]);
  const [highlightedCountryId, setHighlightedCountryId] = useState(null);

  function filterCountries(selectedFilters: any) {
    const newFilteredCountries = Object.entries(countryData).filter(
      (country) => {
        const countryData: any = country[1];
        let matchesFilter: Array<any> = [];
        Object.entries(selectedFilters.filters).forEach((entry: any) => {
          const filterName = entry[0];
          const filterData = entry[1];

          if (filterData.selected === '') {
            return;
          }

          const countryFilterData = countryData.attributes[filterName];
          let selectedFilterValue = filterData.selected.toLowerCase();

          if (typeof selectedFilterValue !== 'string') {
            selectedFilterValue = Number(selectedFilterValue);
          }

          selectedFilterValue = isNaN(selectedFilterValue)
            ? selectedFilterValue
            : Number(selectedFilterValue);

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

  function togglePreference(filterName: string, value: string) {
    const newFilters: any = { ...selectedFilters };
    newFilters.filters[filterName as keyof object].selected = value;
    setSelectedFilters(newFilters);
    filterCountries(newFilters);
  }

  function resetPreference(filterName: string, value: string) {
    if (
      selectedFilters.filters[filterName as keyof object].selected !== value
    ) {
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

    Object.entries(newFilters.filters).forEach((entry: any) => {
      const filterData = entry[1];
      if (filterData.selected !== '') {
        filterData.selected = '';
      }
    });

    setSelectedFilters(newFilters);
    filterCountries(newFilters);
  }

  function highlightCountry(countryId: any) {
    setHighlightedCountryId(
      countryId === highlightedCountryId ? null : countryId
    );
  }

  useEffect(() => {
    filterCountries(selectedFilters);
  }, [selectedFilters]);

  return (
    <div className='App'>
      <main className='flex flex-wrap h-screen'>
        <div className='sidebar flex-1 w-1/5 relative'>
          <header className='p-4 text-xl leading-4 text-center font-semibold'>
            Geo Meta Map
          </header>
          <FilterList
            selectedFilters={selectedFilters}
            togglePreference={togglePreference}
            resetPreference={resetPreference}
          />
          <div className='absolute p-4 bottom-0 w-full text-right '>
            <button
              className='bg-secondary-dark px-4 py-2'
              onClick={resetFilters}
            >
              Reset selections
            </button>
          </div>
        </div>

        <Map
          filteredCountries={filteredCountries}
          highlightedCountryId={highlightedCountryId}
        />
        <CountryList
          filteredCountries={filteredCountries}
          highlightCountry={highlightCountry}
          highlightedCountryId={highlightedCountryId}
        />
      </main>
    </div>
  );
}
