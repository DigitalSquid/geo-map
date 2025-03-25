import { Filter } from '@/app/components/filter';

import { FilterListType } from '@/app/types';

function FilterList(props: FilterListType) {
  return (
    <aside className='p-4 border-y border-grey-light'>
      {Object.entries(props.selectedFilters).map((entry, index) => {
        const filter = entry[1];
        return (
          <Filter
            key={index}
            filterTitle={filter.title}
            filterName={entry[0]}
            selectedValue={filter.selected}
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

export default FilterList;
