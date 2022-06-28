import React from 'react';
import { MapContainer,TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import MarkerStyled from './MarkerStyled';

const center = [-27.451471945967455,-58.977043230227004]

const MapView = ({places}) => {
    return ( 
        <MapContainer attributionControl={false} center={center} zoom={10} >
            <TileLayer
                url="https://api.maptiler.com/maps/voyager/{z}/{x}/{y}.png?key=zOsCRqkcw3fXtUb1lzmZ"
            />
            {places.map((location)=> <MarkerStyled position={location} icon="https://cdn-icons-png.flaticon.com/512/993/993854.png"/>)}
        </MapContainer>
     );
}
 
export default MapView;