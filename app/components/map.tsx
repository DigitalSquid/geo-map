import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Line,
} from 'react-simple-maps';

import topoJson from '@/data/countries-50m.json';

interface MapProps {
  filteredCountries: Array<object>;
  highlightedCountryId: number | null;
}

const Map = (props: MapProps) => {
  return (
    <div className='flex-5 w-3/5 overflow-hidden bg-sea-blue'>
      <ComposableMap projection='geoMercator' className='h-full'>
        <ZoomableGroup center={[0, 0]} zoom={1}>
          <Geographies geography={topoJson}>
            {({ geographies }) =>
              geographies.map((geo) => {
                // TODO: Fix any types
                const filteredCountry = props.filteredCountries.find(
                  (country: any) => country[1 as keyof object].id === geo.id
                );
                const is_active = filteredCountry
                  ? 'fill-lime-green'
                  : 'fill-off-white';
                const is_highlighted =
                  props.highlightedCountryId === geo.id
                    ? 'fill-pale-orange'
                    : '';

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    className={`country-${geo.id} transition-all [stroke-width:0.1] stroke-nettle-green ${is_active} ${is_highlighted}`}
                  />
                );
              })
            }
          </Geographies>
          <Line
            className='[stroke-dasharray:1] [stroke-width:0.5] stroke-bright-orange fill-none'
            coordinates={[
              [-180, 0],
              [-90, 0],
              [0, 0],
              [90, 0],
              [180, 0],
            ]}
          />
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default Map;
