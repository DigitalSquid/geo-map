import ReactCountryFlag from 'react-country-flag';

interface CountryListProps {
  filteredCountries: Array<object>;
  highlightCountry: (id: number) => void;
  highlightedCountryId: number | null;
}

// Add country interface

function CountryList(props: CountryListProps) {
  const handleClick = (countryId: number) => {
    props.highlightCountry(countryId);
  };

  return (
    <aside className='flex-1 w-1/5 p-4 h-screen overflow-auto'>
      <span className='fi fi-gr'></span>

      <p>{props.filteredCountries.length} Countries</p>
      <ul>
        {props.filteredCountries.map((country: any, index) => {
          const countryCode = country[0 as keyof object];
          const countryId = country[1 as keyof object].id;
          const selected_styling =
            props.highlightedCountryId === countryId
              ? 'font-bold bg-secondary-dark'
              : '';

          return (
            <li
              className={`transition-all cursor-pointer ${selected_styling}`}
              key={index}
              onClick={() => handleClick(countryId)}
            >
              <ReactCountryFlag
                countryCode={countryCode}
                style={{
                  fontSize: '1.25em',
                  lineHeight: '1.25em',
                  verticalAlign: 'top',
                }}
                className='mr-2'
              />
              {country[1].name}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default CountryList;
