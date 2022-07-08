import React from "react";
import { MuiCell, Typography, MuiRow, Box, Avatar } from "../../styles/material";

const AdminCells = ({data,handleClick,isItemSelected}) => {

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
        <Typography sx={{ width: "100px" }}>{data.cuil}</Typography>
      </MuiCell>
      <MuiCell align="left" sx={{ fontSize: "15px", width: "150px" }}>
        <Box display="flex" alignItems="center" gap="6px">
          <Avatar src={data.image}>{data.name[0]}</Avatar>
          <Typography sx={{ width: "150px", fontWeight: 600 }}>
            {data.lastName + " " + data.name}
          </Typography>
        </Box>
      </MuiCell>
      <MuiCell align="left" sx={{ fontSize: "15px", color: "#545252" }}>
        {data.email}
      </MuiCell>
    </MuiRow>
  );
};

export default AdminCells;