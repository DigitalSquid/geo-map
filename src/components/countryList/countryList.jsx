import './countryList.scss';
import Flags from 'country-flag-icons/react/3x2';

function CountryList(props) {
  return (
    <aside className='country-list'>
      <span className='fi fi-gr'></span>

      <p>{props.filteredCountries.length} Countries</p>
      <ul>
        {/* {Object.entries(props.filteredCountries).map((country, index) => { */}
        {props.filteredCountries.map((country, index) => {
          const Flag = Flags[country[0]];
          return (
            <li key={index}>
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
