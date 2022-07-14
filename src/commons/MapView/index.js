import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerStyled from './MarkerStyled'

const center = [-27.451471945967455, -58.977043230227004];

const MapView = ({ places, selected, label }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!map || !selected?.coordinateLatitude) return;
    map.flyTo([selected.coordinateLatitude, selected.coordinateLength], 17);
  }, [selected, map]);

  return (
    selected.id &&
    places && (
      <MapContainer
        center={places[0] ? [places[0].coordinateLatitude,places[0].coordinateLength] : center}
        zoom={5}
        ref={setMap}
      >
        <TileLayer url="https://api.maptiler.com/maps/outdoor/256/{z}/{x}/{y}.png?key=zOsCRqkcw3fXtUb1lzmZ" />
        {places.map((place, i) => <MarkerStyled key={place.id} place={place} label={label}/>)}
      </MapContainer>
    )
  );
};

export default MapView;
