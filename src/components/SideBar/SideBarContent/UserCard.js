import React from "react";
import { Grid, Avatar, Typography, Box } from "../../../styles/material";
import { getRandomColor } from "../../../utils/functions";
import { useSelector } from "react-redux";

const UserCard = () => {

  const { userInfo } = useSelector(state=>state.user)

  if (!userInfo.name) return
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
        alt={userInfo.name}
        src={userInfo.image}
      >
        <Typography fontSize={33}> {userInfo.name[0]} </Typography>
      </Avatar>
      <Box textAlign="center">
        <Typography variant="h6"> {userInfo.name} </Typography>
        <Typography color="lightgray"> {userInfo.role} </Typography>
      </Box>
    </Grid>
  );
};

export default UserCard;
