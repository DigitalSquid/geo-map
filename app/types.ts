interface FilterOption {
  title: string;
  selected: string;
  style: string;
  options: string[];
}

export interface Filters {
  officialCoverage: FilterOption;
  drivingSide: FilterOption;
  hemisphere: FilterOption;
  cameraGen: FilterOption;
  roadLines: FilterOption;
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
  cameraGen: string | string[] | null;
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
  [key: string]: {
    name: string;
    iso: string;
    id: string;
    attributes: CountryAttributes;
  };
}
