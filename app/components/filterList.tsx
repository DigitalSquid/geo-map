import { Filter } from '@/app/components/filter';

interface FilterListProps {
  selectedFilters: Filters;
  togglePreference: (name: string, value: string) => void;
  resetPreference: (name: string, value: string) => void;
}

// Consider moving to types.ts file and import
// These properties are duplicated across multiple types
interface Filters {
  filters: FilterProps;
}

interface FilterProps {
  filterTitle: string;
  selectedValue: string;
  options: Array<string>;
  style: string;
}

function filterList(props: FilterListProps) {
  return (
    <aside className='p-4 border-y border-tertiary'>
      {Object.entries(props.selectedFilters.filters).map((entry, index) => {
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

export default filterList;
