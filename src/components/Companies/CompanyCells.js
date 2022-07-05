import React from "react";
import { MuiCell, Typography, MuiRow, Avatar,Box } from "../../styles/material";
import Status from '../../commons/Status'

const CompanyCells = ({ data, handleClick, isItemSelected }) => {

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
          <Avatar src={data.logo}>{data.legalName[0]}</Avatar>
          <Typography sx={{ width: "150px", fontWeight: 600 }}>
            {data.legalName}
          </Typography>
        </Box>
      </MuiCell>
      <MuiCell align="left" sx={{ fontSize: "15px", color: "#545252" }}>
        <Status status={data.contractEndDate > new Date().toISOString().split('T')[0]}/>
      </MuiCell>
      <MuiCell align="left" sx={{ fontSize: "15px", color: "#545252" }}>
        {data.contractStartDate}
      </MuiCell>
      <MuiCell align="left" sx={{ fontSize: "15px", color: "#545252" }}>
        {data.contractEndDate}
      </MuiCell>
    </MuiRow>
  );
};

export default CompanyCells;
