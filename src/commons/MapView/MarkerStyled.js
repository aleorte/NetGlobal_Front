import React from 'react';
import { Marker } from 'react-leaflet';
import IconLocation from './IconLocation';

const MarkerStyled = ({position,icon}) => {
    return ( 
        <Marker position={position} icon={IconLocation(icon)} />
    );
}
 
export default MarkerStyled;