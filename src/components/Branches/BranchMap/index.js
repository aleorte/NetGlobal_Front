import React, { useState, useEffect } from "react";
import {
  Popup,
  Circle,
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useSelector, useDispatch } from "react-redux";
import { getAvailableGuards } from "../../../state/branch";
import { branchIcon } from "./icons";
import BranchMarker from "./BranchMarker";

const BranchMap = ({ selected }) => {
  const [map, setMap] = useState(null);
  const dispatch = useDispatch();
  const { guards } = useSelector((state) => state.branch);
  const [branchPosition, setBranchPosition] = useState([0, 0]);
  const [linePosition, setLinePosition] = useState([
    [0, 0],
    [0, 0],
  ]);

  useEffect(() => {
    selected.id && dispatch(getAvailableGuards(selected.id));
  }, [selected]);

  useEffect(() => {
    if (!map || !selected?.coordinateLatitude) return;
    setBranchPosition([selected.coordinateLatitude, selected.coordinateLength]);
    map.flyTo([selected.coordinateLatitude, selected.coordinateLength], 11);
  }, [selected, map]);

  const onClick = (e) => {
    const { lat, lng } = e.latlng;
    setLinePosition([branchPosition, [lat, lng]]);
  };

  return (
    <MapContainer
      center={selected.id ? [selected.coordinateLatitude, selected.coordinateLength] : [0,0]}
      zoom={selected.id ? 11 : 3}
      ref={setMap}
    >
      <TileLayer url="https://api.maptiler.com/maps/outdoor/256/{z}/{x}/{y}.png?key=zOsCRqkcw3fXtUb1lzmZ" />
      {selected.id && guards && (
        <>
          <Marker position={branchPosition} icon={branchIcon}>
            <Popup>{selected.name}</Popup>
          </Marker>
          <Circle
            color="purple"
            fillColor="transparent"
            radius={15209}
            center={branchPosition}
          />
          <Polyline positions={linePosition} />

          {guards.length &&
            guards.map((guard) => {
              return (
                <BranchMarker
                  key={guard?.id}
                  guard={guard}
                  branch={selected}
                  onClick={onClick}
                />
              );
            })}
        </>
      )}
    </MapContainer>
  );
};

export default BranchMap;
