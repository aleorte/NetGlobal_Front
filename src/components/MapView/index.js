import React from 'react';
import { MapContainer,TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const center = [-27.451471945967455,-58.977043230227004]

const MapView = () => {
    return ( 
        <MapContainer attributionControl={false} center={center} zoom={10} >
            <TileLayer
                url="https://api.maptiler.com/maps/voyager/{z}/{x}/{y}.png?key=zOsCRqkcw3fXtUb1lzmZ"
            />

        </MapContainer>
     );
}
 
export default MapView;