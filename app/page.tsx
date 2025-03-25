'use client';

import { useState, useEffect } from 'react';
import filterOptions from '@/data/filters.json';
import countryData from '@/data/countryData.json';

import Sidebar from '@/app/components/sidebar';
import Map from '@/app/components/map';
import FilterList from '@/app/components/filterList';
import CountryList from '@/app/components/countryList';

import { CountryAttributes, Countries, Filters } from '@/app/types';

export default function Home() {
  const [selectedFilters, setSelectedFilters] = useState(filterOptions);
  const [filteredCountries, setFilteredCountries] = useState<Countries>({});
  const [highlightedCountryId, setHighlightedCountryId] = useState<
    string | null
  >(null);

  function filterCountries(selectedFilters: Filters) {
    const newFilteredCountries = Object.fromEntries(
      Object.entries(countryData).filter((country) => {
        const countryData = country[1];
        const matchesFilter: Array<boolean> = [];

        Object.entries(selectedFilters).forEach((entry) => {
          const filterName = entry[0];
          const filterData = entry[1];

          if (filterData.selected === '') {
            return;
          }

          const countryFilterData =
            countryData.attributes[filterName as keyof CountryAttributes];
          const selectedFilterValue = filterData.selected.toLowerCase();

          matchesFilter.push(
            Array.isArray(countryFilterData)
              ? countryFilterData.some((value) => value === selectedFilterValue)
              : countryFilterData === selectedFilterValue
          );
        });

        return matchesFilter.every((match) => match);
      })
    );

    setFilteredCountries(newFilteredCountries);
  }

  function togglePreference(filterName: string, value: string) {
    const newFilters: Filters = { ...selectedFilters };
    newFilters[filterName as keyof Filters].selected = value;
    setSelectedFilters(newFilters);
    filterCountries(newFilters);
  }

  function resetPreference(filterName: string, value: string) {
    if (selectedFilters[filterName as keyof Filters]['selected'] !== value) {
      return;
    }

    const newFilters = JSON.parse(JSON.stringify(selectedFilters));

    newFilters[filterName]['selected'] =
      newFilters[filterName].selected === value ? '' : value;

    setSelectedFilters(newFilters);
    filterCountries(newFilters);
  }

  function resetFilters() {
    const newFilters = { ...selectedFilters };

    Object.entries(newFilters).forEach(([_, filterData]) => {
      console.log(_, filterData);
      if (filterData.selected !== '') {
        filterData.selected = '';
      }
    });

    setSelectedFilters(newFilters);
    filterCountries(newFilters);
  }

  function highlightCountry(countryId: string) {
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
