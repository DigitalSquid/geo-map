import ReactCountryFlag from 'react-country-flag';

import { Countries } from '@/app/types';

interface CountryListProps {
  filteredCountries: Countries;
  highlightCountry: (id: string) => void;
  highlightedCountryId: string | null;
}

function CountryList(props: CountryListProps) {
  const handleClick = (countryId: string) => {
    props.highlightCountry(countryId);
  };

  return (
    <aside className='flex-1 p-4 h-screen overflow-auto'>
      <span className='fi fi-gr'></span>

      <p>{Object.keys(props.filteredCountries).length} Countries</p>
      <ul>
        {Object.values(props.filteredCountries).map((country) => {
          const countryId = country.id;
          const selected_styling =
            props.highlightedCountryId === countryId
              ? 'font-bold bg-grey-dark'
              : '';
          return (
            <li
              key={country.id}
              onClick={() => handleClick(countryId)}
              className={`transition-all cursor-pointer ${selected_styling}`}
            >
              <ReactCountryFlag
                countryCode={country.iso}
                svg
                style={{
                  fontSize: '1.25em',
                  lineHeight: '1.25em',
                  verticalAlign: 'top',
                }}
                className='mr-2'
              />
              {country.name}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default CountryList;
