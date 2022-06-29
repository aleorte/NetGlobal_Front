import React from "react";
import { MuiCell, Typography, MuiRow } from "../../styles/material";
import Status from '../../commons/Status'

const CompanyCells = ({ data, handleClick, isItemSelected }) => {
  return (
    <MuiRow
      hover
      onClick={(event) => handleClick(event, data.id)}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={data.cuit}
      selected={isItemSelected}
    >
      <MuiCell
        sx={{
          fontSize: "15px",
          width: "100px",
          color: "#545252",
        }}
      >
        <Typography sx={{ width: "100px" }}>{data.cuit}</Typography>
      </MuiCell>
      <MuiCell align="left" sx={{ fontSize: "15px", width: "300px" }}>
        <Typography sx={{ width: "100px", fontWeight: 600 }}>
          {data.name}
        </Typography>
      </MuiCell>
      <MuiCell align="left" sx={{ fontSize: "15px", color: "#545252" }}>
        <Status status={data.status}/>
      </MuiCell>
      <MuiCell align="left" sx={{ fontSize: "15px", color: "#545252" }}>
        {data.inicio}
      </MuiCell>
      <MuiCell align="left" sx={{ fontSize: "15px", color: "#545252" }}>
        {data.final}
      </MuiCell>
    </MuiRow>
  );
};

export default CompanyCells;
