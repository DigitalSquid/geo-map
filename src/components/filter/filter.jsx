import './filter.scss';

export function Filter(props) {
  const handleChange = (e) => {
    props.togglePreference(e.currentTarget.name, e.currentTarget.value);
  };
  const handleClick = (e) => {
    props.resetPreference(e.currentTarget.name, e.currentTarget.value);
  };

  return (
    <div className={`map-filter ${props.style}`}>
      <p className='title'>{props.filterTitle}</p>
      <div className='filters'>
        {props.options.map((option, index) => {
          const isSelected = props.selected === option ? ' selected' : '';
          return (
            <div className={`filter${isSelected}`} key={index}>
              <input
                type='radio'
                id={props.filterName + index}
                name={props.filterName}
                value={option}
                onChange={handleChange}
                onClick={handleClick}
                checked={props.selected == option}
              />
              <label
                className={`${props.filterName.toLowerCase()} ${option}`}
                htmlFor={props.filterName + index}
                checked={props.selected === index ?? 'checked'}
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
