import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Polygon } from '@react-google-maps/api';
import countryPaths from '../../constants/countryPaths';

import './map.scss';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

function Map(props) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBeJU2ffITBuRoXJzpqbuqQrhqwAvgr694',
  });

  const mapStyles = {};
  const mapOptions = {
    streetViewControl: false,
    fullscreenControl: false,
    styles: mapStyles,
  };

  const polygonOptions = {
    fillColor: 'green',
    fillOpacity: 0.1,
    fillOpacity: 0.4,
    strokeColor: 'red',
    strokeOpacity: 0.1,
    strokeWeight: 1,
    clickable: false,
    draggable: false,
    editable: false,
    geodesic: false,
    zIndex: 1,
  };

  const center = { lat: 0, lng: 0 };
  const zoomLevel = 2;

  const [polygonCountries, setPolygonCountries] = useState([]);

  useEffect(() => {
    const filteredCountries = props.filteredCountries.filter(
      (countryData) => countryPaths[countryData[0]]
    );

    const polygonData = filteredCountries.map((country, index) => {
      const isoCode = country[0];
      if (!countryPaths[isoCode]) {
        return;
      }
      const path = countryPaths[isoCode].coordinates;
      const polygon = (
        <Polygon key={index} paths={path} options={polygonOptions} />
      );
      return { id: isoCode, polygon };
    });

    const nonMatching = polygonCountries.filter(
      (country) =>
        !filteredCountries.find(
          (filterCountry) => filterCountry[0] === country[0]
        )
    );

    if (nonMatching.length > 0) {
      nonMatching.forEach((country) => {
        const index = polygonData.findIndex(
          (polyCountry) => polyCountry[0] === country[0]
        );
        // polygonData[index].setMap(null);
        polygonData.splice(index, 1);
      });
    }

    setPolygonCountries(polygonData);
  }, [props.filteredCountries]);

  console.log(polygonCountries);

  return isLoaded ? (
    <div className='map-container'>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoomLevel}
        options={mapOptions}
      >
        {polygonCountries.map((country) => country.polygon)}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default Map;
