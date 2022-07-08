import React from "react";
import { MuiCell, Typography, MuiRow ,Box } from "../../styles/material";
import Status from '../../commons/Status'

const BranchCells = ({ data, handleClick, isItemSelected }) => {

  return (
    <MuiRow
      hover
      onClick={(event) => {
        handleClick(event, data.id)
      }}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={data.cuit}
      selected={isItemSelected}
    >
      <MuiCell
        sx={{
          fontSize: "15px",
          width: "80px",
          color: "#545252",
        }}
      >
        <Typography sx={{ width: "100px" }}>{data.cuit}</Typography>
      </MuiCell>
      <MuiCell align="left" sx={{ fontSize: "15px", width: "150px" }}>
        <Box display="flex" alignItems="center" gap="6px">
          <Typography sx={{ width: "150px", fontWeight: 600 }}>
            {data.name}
          </Typography>
        </Box>
      </MuiCell>
      <MuiCell align="left" sx={{ fontSize: "15px", color: "#545252" }}>
        <Status status={data.active}/>
      </MuiCell>
    </MuiRow>
  );
};

export default BranchCells;
