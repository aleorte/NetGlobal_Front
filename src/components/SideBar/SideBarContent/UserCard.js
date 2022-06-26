import React from "react";
import { Grid, Avatar, Typography, Box } from "../../../styles/material";
import { getRandomColor } from "../../../utils/functions";

const UserCard = ({ user }) => {
  return (
    <Grid
      display="flex"
      flexDirection="column"
      gap={2}
      width="100%"
      alignItems="center"
      my={3}
    >
      <Avatar
        sx={{ width: "100px", height: "100px", bgcolor: getRandomColor() }}
        alt={user.name}
        src={user.image}
      >
        <Typography fontSize={33}> {user.name[0]} </Typography>
      </Avatar>
      <Box textAlign="center">
        <Typography variant="h6"> {user.name} </Typography>
        <Typography color="lightgray"> Administrador </Typography>
      </Box>
    </Grid>
  );
};

export default UserCard;
