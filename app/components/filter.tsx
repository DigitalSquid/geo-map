interface FilterProps {
  key: number;
  filterTitle: string;
  filterName: string;
  selectedValue: string;
  options: Array<string>;
  togglePreference: (name: string, value: string) => void;
  resetPreference: (name: string, value: string) => void;
  style: string;
}

export function Filter(props: FilterProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.togglePreference(e.currentTarget.name, e.currentTarget.value);
  };

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    if (props.selectedValue === e.currentTarget.value)
      props.resetPreference(e.currentTarget.name, e.currentTarget.value);
  };

  let filter_style: string = '';
  let label_style: string = '';
  let wrapper_style: string = '';

  // Switch statement giving incorrect results so we're doing this instead
  if (props.style === 'toggle') {
    filter_style = 'w-1/2';
    wrapper_style = 'w-1/2';
    label_style =
      'w-full p-1 peer-checked:bg-primary peer-checked:text-dark-grey';
  } else if (props.style === 'options') {
    label_style =
      'px-3 py-2 w-full peer-checked:bg-primary peer-checked:text-dark-grey';
    wrapper_style = 'w-1/2';
  } else if (props.style === 'icons') {
    wrapper_style = 'w-full justify-between mt-2';
    label_style =
      'opacity-40 peer-checked:opacity-100 h-12 w-12 indent-40 overflow-hidden whitespace-nowrap';
  }

  return (
    <div className={`flex flex-wrap mt-4 first:mt-0 ${props.style}`}>
      <p className='mt-1 leading-6 grow font-semibold'>{props.filterTitle}</p>
      <div className={`flex flex-wrap justify-end ${wrapper_style}`}>
        {props.options.map((option, index) => {
          return (
            <div className={filter_style} key={index}>
              <input
                type='radio'
                id={props.filterName + index}
                className='hidden peer'
                name={props.filterName}
                value={option}
                onChange={handleChange}
                onClick={handleClick}
                checked={props.selectedValue === option.toString()}
              />
              <label
                className={`border border-tertiary inline-block text-center select-none cursor-pointer capitalize text-sm font-semibold  ${label_style} ${props.filterName.toLowerCase()} ${option}`}
                htmlFor={props.filterName + index}
              >
                {option}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
