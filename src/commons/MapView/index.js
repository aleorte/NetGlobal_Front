import React, { useState,useEffect,Fragment } from 'react';
import { MapContainer,TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import MarkerStyled from './MarkerStyled';

const center = [-27.451471945967455,-58.977043230227004]

const MapView = ({places,selected}) => {

    const [map,setMap] = useState(null)

    useEffect(()=>{
        if (!map || !selected?.coordinateLatitude) return
        map.flyTo([selected.coordinateLatitude,selected.coordinateLength],17)
    },[selected,map])

    return (
        
         (selected.id && places) && 
            <MapContainer attributionControl={false} center={places[0] ? places[0]?.position : center} zoom={5} ref={setMap} >
                <TileLayer
                    url="https://api.maptiler.com/maps/openstreetmap/256/{z}/{x}/{y}.jpg?key=zOsCRqkcw3fXtUb1lzmZ"
                />
                {places.map((location,i)=> <Fragment key={location?.logo}><MarkerStyled position={location?.position} icon={location?.logo || location?.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRADctatI6GbQD3NM3VaBvwQtnkbg5LBXwfTyaGfD8fgmL38SUUdnPTlfmrVvCu4l_-rzk&usqp=CAU"}/></Fragment>)}
            </MapContainer> 
        
     );
}
 
export default MapView;