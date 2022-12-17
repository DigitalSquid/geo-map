import { Filter } from '../filter/filter';

import './mapFilters.scss';

function MapFilters(props) {
  return (
    <aside className='map-filters'>
      {Object.entries(props.selectedFilters.filters).map((entry, index) => {
        const filter = entry[1];
        return (
          <Filter
            key={index}
            filterTitle={filter.title}
            filterName={entry[0]}
            selected={filter.selected}
            options={filter.options}
            togglePreference={props.togglePreference}
            resetPreference={props.resetPreference}
            style={filter.style ?? 'toggle'}
          />
        );
      })}
    </aside>
  );
}

export default MapFilters;
