import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';

import topoJson from '../../constants/countries-50m';

import './map.scss';

const Map = (props) => {
  return (
    <div className='map-container'>
      <ComposableMap projection='geoMercator' className='country-map'>
        <ZoomableGroup center={[0, 0]} zoom={1}>
          <Geographies geography={topoJson}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const filteredCountry = props.filteredCountries.find(
                  (country) => country[1].id === geo.id
                );
                const isActive = filteredCountry ? 'active' : '';

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    className={`country-${geo.id} ${isActive}`}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default Map;
