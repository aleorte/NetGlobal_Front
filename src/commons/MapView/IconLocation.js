import React from 'react';
import L from 'leaflet'

const IconLocation = (url)=>{

    return L.icon({
        iconUrl:url,
        iconRetinaUrl:url,
        iconSize:[35,35],
        iconAnchor: [15, 15],
    })
}
 
export default IconLocation;