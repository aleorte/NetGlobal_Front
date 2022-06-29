import React from 'react';
import { MapContainer,TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import MarkerStyled from './MarkerStyled';

const center = [-27.451471945967455,-58.977043230227004]

const MapView = ({places}) => {
    return ( 
        <MapContainer attributionControl={false} center={center} zoom={5} >
            <TileLayer
                url="https://api.maptiler.com/maps/openstreetmap/256/{z}/{x}/{y}.jpg?key=zOsCRqkcw3fXtUb1lzmZ"
            />
            {places.map((location,i)=> <MarkerStyled key={i} position={location} icon="https://cdn-icons-png.flaticon.com/512/993/993854.png"/>)}
        </MapContainer>
     );
}
 
export default MapView;