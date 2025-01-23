'use client';

import { useState, useEffect } from 'react';
import filterOptions from '@/data/filters.json';
import countryData from '@/data/countryData.json';

import Sidebar from '@/app/components/sidebar';
import Map from '@/app/components/map';
import FilterList from '@/app/components/filterList';
import CountryList from '@/app/components/countryList';

import { Country, CountryAttributes, Filters } from '@/app/types';

export default function Home() {
  const [selectedFilters, setSelectedFilters] =
    useState<Filters>(filterOptions);
  const [filteredCountries, setFilteredCountries] = useState<Array<object>>([]);
  const [highlightedCountryId, setHighlightedCountryId] = useState(null);

  function filterCountries(selectedFilters: Filters) {
    // TODO: is the right way to do it? Could we copy the object and reduce, or have the country identifiers in a seperate array?

    const newFilteredCountries = Object.entries(countryData).filter(
      (country) => {
        // console.log(country);
        const countryData: Country = country[1];
        let matchesFilter: Array<any> = [];
        Object.entries(selectedFilters).forEach((entry: any) => {
          const filterName = entry[0];
          const filterData = entry[1];

          if (filterData.selected === '') {
            return;
          }

          const countryFilterData =
            countryData.attributes[filterName as keyof CountryAttributes];
          let selectedFilterValue = filterData.selected.toLowerCase();

          if (typeof selectedFilterValue !== 'string') {
            selectedFilterValue = Number(selectedFilterValue);
          }

          selectedFilterValue = isNaN(selectedFilterValue)
            ? selectedFilterValue
            : Number(selectedFilterValue);

          matchesFilter.push(
            Array.isArray(countryFilterData)
              ? countryFilterData.some((value) => value === selectedFilterValue)
              : countryFilterData === selectedFilterValue
          );
        });
        console.log(matchesFilter);
        return !matchesFilter.includes(false);
      }
    );
    setFilteredCountries(newFilteredCountries);
  }

  function togglePreference(filterName: string, value: string) {
    const newFilters: Filters = { ...selectedFilters };
    newFilters[filterName as keyof object]['selected'] = value;
    setSelectedFilters(newFilters);
    filterCountries(newFilters);
  }

  function resetPreference(filterName: string, value: string) {
    if (selectedFilters[filterName as keyof object]['selected'] !== value) {
      return;
    }

    let newFilters = { ...selectedFilters };

    newFilters[filterName as keyof object]['selected'] =
      newFilters[filterName as keyof object].selected === value ? '' : value;

    setSelectedFilters(newFilters);
    filterCountries(newFilters);
  }

  function resetFilters() {
    const newFilters = { ...selectedFilters };

    Object.entries(newFilters).forEach((entry: any) => {
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
        <Sidebar resetFilters={resetFilters}>
          <FilterList
            selectedFilters={selectedFilters}
            togglePreference={togglePreference}
            resetPreference={resetPreference}
          />
        </Sidebar>

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
