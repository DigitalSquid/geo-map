import './countryList.scss';
import Flags from 'country-flag-icons/react/3x2';

function CountryList(props) {
  const handleClick = (countryId) => {
    props.highlightCountry(countryId);
  };

  return (
    <aside className='country-list'>
      <span className='fi fi-gr'></span>

      <p>{props.filteredCountries.length} Countries</p>
      <ul>
        {props.filteredCountries.map((country, index) => {
          const Flag = Flags[country[0]];
          return (
            <li key={index} onClick={() => handleClick(country[1].id)}>
              <Flag />
              {country[1].name}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default CountryList;
