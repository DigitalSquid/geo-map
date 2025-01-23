export interface FilterProps {
  filterTitle: string;
  selected: string | number;
  selectedValue: string;
  options: Array<string>;
  style: string;
}

export interface Filters {
  [key: symbol]: FilterProps;
}

export interface FilterListType {
  selectedFilters: Filters;
  togglePreference: (name: string, value: string) => void;
  resetPreference: (name: string, value: string) => void;
}

// TODO: Tidy up country data so we don't have the mixed single values and arrays, eg: cameraGen and roadLines
export interface CountryAttributes {
  drivingSide: string;
  carColour: string | null;
  cameraGen: number | number[] | null;
  officialCoverage: string;
  roadLines: string[] | string;
  hemisphere: string[] | string;
}

export interface Country {
  name: string;
  iso: string;
  id: string;
  attributes: CountryAttributes;
}

export interface Countries {
  [key: string]: Country;
}
