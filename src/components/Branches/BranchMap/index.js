import React, { useState, useEffect } from "react";
import { Popup, Circle, MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Marker } from "react-leaflet";
import { useSelector, useDispatch } from "react-redux";
import { getAvailableGuards } from "../../../state/branch";
import { Avatar, Box, Typography } from "../../../styles/material";
import { getDistance } from "../../../utils/mapFunctions";
import { branchIcon,guardIcon } from "./icons";
import { DirectionsCarIcon,DirectionsWalkIcon } from "../../../styles/materialIcons";

const BranchMap = ({ selected }) => {
  const [map, setMap] = useState(null);
  const dispatch = useDispatch();
  const { guards } = useSelector((state) => state.branch);
  const [branchPosition,setBranchPosition] = useState([0,0])

  useEffect(() => {
    selected.id && dispatch(getAvailableGuards(selected.id));
  }, [selected]);

  useEffect(() => {
    if (!map || !selected?.coordinateLatitude) return;
    setBranchPosition([selected.coordinateLatitude, selected.coordinateLength])
    map.flyTo([selected.coordinateLatitude, selected.coordinateLength], 14);
  }, [selected, map]);

  return (
    selected.id &&
    guards && (
      <MapContainer
        center={[selected.coordinateLatitude, selected.coordinateLength]}
        zoom={14}
        ref={setMap}
      >
        <TileLayer url="https://api.maptiler.com/maps/outdoor/256/{z}/{x}/{y}.png?key=zOsCRqkcw3fXtUb1lzmZ" />
        <Marker
          position={branchPosition}
          icon={branchIcon}
        >
          <Popup>{selected.name}</Popup>
        </Marker>
        <Circle
          color="purple"
          fillColor="transparent"
          radius={15209}
          center={branchPosition}
        />

        {guards.map((guard) => {

          const guardPosition = [guard.coordinateLatitude, guard.coordinateLength]
          return (
            <Marker
              key={guard?.id}
              position={[guard.coordinateLatitude, guard.coordinateLength]}
              icon={guardIcon}
            >
                <Popup>
                    <Box display="flex" gap={1} alignItems="center">
                        <Avatar src={guard?.image}></Avatar>
                        <Box display="flex" flexDirection="column" justifyContent="center">
                            <Box display="flex" gap={1}>
                                <Typography variant="body2" sx={{m:"5px !important"}} fontWeight="bold">{guard.lastName + " " + guard.name}</Typography>
                                <Typography variant="body2" sx={{m:"5px !important",color:"gray"}}> { getDistance(branchPosition,guardPosition) } m </Typography>
                            </Box>
                            <Box display="flex" gap={1} alignItems="center" justifyContent="space-around">
                                <Box display="flex" alignItems="center">                   
                                    <DirectionsWalkIcon/>
                                    <Typography variant="body2" sx={{m:"0 !important",color:"gray"}}> 160 min </Typography>
                                </Box>
                                <Box display="flex" alignItems="center">
                                    <DirectionsCarIcon/>
                                    <Typography variant="body2" sx={{m:"0 !important",color:"gray"}}> 20 min </Typography> 
                                </Box>  
                            </Box>
                        </Box>
                    </Box>
                </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    )
  );
};

export default BranchMap;
