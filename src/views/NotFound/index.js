import React from "react";
import { Box,Typography } from "../../styles/material";

const NotFound = () => {
  return (
    <Box
      height="80vh"
      width="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
        <Typography> 404 NOT FOUND</Typography>
    </Box>
  );
};

export default NotFound;
