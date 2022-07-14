import React from "react";
import { Marker, Popup } from "react-leaflet";
import IconLocation from "./IconLocation";
import { Box, Avatar, Typography } from "../../styles/material";

const MarkerStyled = ({ place, label }) => {
  const position = [place.coordinateLatitude, place.coordinateLength];
  const icon =
    label === "Compañias"
      ? "apartment"
      : label === "Vigiladores"
      ? "person"
      : "person_4";

  return (
    <Marker key={place?.logo} position={position} icon={IconLocation(icon)}>
      <Popup>
        <Box display="flex" gap={1} alignItems="center">
          <Avatar src={place.logo || place.image}></Avatar>
          <Box display="flex" flexDirection="column">
            <Typography sx={{ m: "0 !important"}} fontWeight="bold">
                {place.legalName || place.lastName + " " + place.name}
            </Typography>
            <Typography variant="caption" sx={{m: "0 !important",color:"gray"}}>
                {place.street + " " + place.number}
            </Typography>
          </Box>
        </Box>
      </Popup>
    </Marker>
  );
};

export default MarkerStyled;
