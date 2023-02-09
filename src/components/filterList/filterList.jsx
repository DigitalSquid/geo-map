import { Filter } from '../filter/filter';

import './filterList.scss';

function filterList(props) {
  return (
    <aside className='filter-list'>
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
            style={filter.style ?? 'options'}
          />
        );
      })}
    </aside>
  );
}

export default filterList;
