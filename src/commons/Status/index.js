import { Typography, Box } from "../../styles/material";
import React from "react";

const Status = ({ status }) => {
  return (
    <Box
      width="80px"
      textAlign="center"
      sx={{
        backgroundColor: status ? "#C5E1A5" : "#EF9A9A",
        borderRadius: "10px",
      }}
    >
      <Typography color={status ? "green" : "error"}>
        {status ? "Active" : "Inactive"}
      </Typography>
    </Box>
  );
};

export default Status;
