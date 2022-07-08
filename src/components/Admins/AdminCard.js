import React from "react";
import { Avatar, Grid, Typography, Button, Box } from "../../styles/material";
import StatsCard from "../../commons/StatsCard";
import {
  AssignmentInd,
  Business,
  VisibilityOutlined,
} from "../../styles/materialIcons";
import EditAdmin from "./EditAdmin";

const AdminCard = ({ selected }) => {
  if (!selected?.id) return;
  return (
    <Grid
      display="flex"
      justifyContent="space-around"
      flexDirection="column"
      width="100%"
      height="100%"
      alignItems="center"
      position="relative"
    >
      <Box position="absolute" top="5px" right="13px">
        <EditAdmin selected={selected} />
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar
          sx={{
            height: "120px",
            width: "120px",
            backgroundSize: "cover",
            border: "1px solid black",
          }}
          src={selected?.image}
        >
          {selected.name[0]}
        </Avatar>
        <Typography mt={1} fontWeight={400} fontSize={25}>
          {" "}
          {selected.lastName + " " + selected.name}{" "}
        </Typography>
      </Box>
      
      
    </Grid>
  );
};

export default AdminCard;
