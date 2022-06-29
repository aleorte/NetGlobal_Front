import React from "react";
import { MuiCell, Typography, MuiRow, Avatar,Box } from "../../styles/material";
import Status from '../../commons/Status'
import { useDispatch } from "react-redux";

const CompanyCells = ({ data, handleClick, isItemSelected,handleSelect }) => {

  const dispatch = useDispatch()

  return (
    <MuiRow
      hover
      onClick={(event) => {
        handleClick(event, data.id)
        dispatch(handleSelect(data))
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
          width: "100px",
          color: "#545252",
        }}
      >
        <Typography sx={{ width: "100px" }}>{data.cuit}</Typography>
      </MuiCell>
      <MuiCell align="left" sx={{ fontSize: "15px", width: "300px" }}>
        <Box display="flex" alignItems="center" gap="6px">
          <Avatar src={data.logo}>{data.legalName[0]}</Avatar>
          <Typography sx={{ width: "100px", fontWeight: 600 }}>
            {data.legalName}
          </Typography>
        </Box>
      </MuiCell>
      <MuiCell align="left" sx={{ fontSize: "15px", color: "#545252" }}>
        <Status date={data.contractEndDate}/>
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
