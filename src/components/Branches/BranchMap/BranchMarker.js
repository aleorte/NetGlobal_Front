import React from "react";
import { Box, Avatar, Typography } from "../../../styles/material";
import {
  DirectionsCarIcon,
  DirectionsWalkIcon,
} from "../../../styles/materialIcons";
import { getDistance,walkTime,carTime } from "../../../utils/mapFunctions";
import { Popup, Marker } from "react-leaflet";
import { guardIcon } from "./icons";

const BranchMarker = ({ guard, branch,onClick }) => {

  const guardPosition = [guard.coordinateLatitude, guard.coordinateLength];
  const branchPosition = [branch.coordinateLatitude, branch.coordinateLength];
  const distance = getDistance(branchPosition, guardPosition)

  return (
    <Marker
      position={guardPosition}
      icon={guardIcon}
      eventHandlers={{
        click: onClick ,
      }}
    >
      <Popup>
        <Box display="flex" gap={1} alignItems="center">
          <Avatar src={guard?.image}></Avatar>
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Box display="flex" gap={1}>
              <Typography
                variant="body2"
                sx={{ m: "5px !important" }}
                fontWeight="bold"
              >
                {guard.lastName + " " + guard.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{ m: "5px !important", color: "gray" }}
              >
                {distance} m{" "}
              </Typography>
            </Box>
            <Box
              display="flex"
              gap={1}
              alignItems="center"
              justifyContent="space-around"
            >
              <Box display="flex" alignItems="center">
                <DirectionsWalkIcon />
                <Typography
                  variant="body2"
                  sx={{ m: "0 !important", color: "gray" }}
                >
                  {walkTime(distance)} min
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <DirectionsCarIcon />
                <Typography
                  variant="body2"
                  sx={{ pl:0.5,m: "0 !important", color: "gray" }}
                >
                  {carTime(distance)} min
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Popup>
    </Marker>
  );
};

export default BranchMarker;
