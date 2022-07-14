import React from 'react';
import { Marker } from 'react-leaflet';
import IconLocation from './IconLocation';

const MarkerStyled = ({position,icon,children}) => {
    return ( 
        <Marker position={position} icon={IconLocation(icon)}>
            {children}
        </Marker>
    );
}
 
export default MarkerStyled;