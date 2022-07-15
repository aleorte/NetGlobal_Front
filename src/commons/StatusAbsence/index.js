import React from "react";
import { Box, Typography } from "../../styles/material";

const StatusAbsence = ({ status }) => {
  return (
    <Box
      width="90px"
      textAlign="center"
      sx={{
        padding: "0 3px",
        backgroundColor: status ? "#C5E1A5" : "#EF9A9A",
        borderRadius: "10px",
      }}
    >
      <Typography color={status ? "green" : "error"}>
        {status ? "Aprobada" : "Rechazada"}
      </Typography>
    </Box>
  );
};

export default StatusAbsence;
