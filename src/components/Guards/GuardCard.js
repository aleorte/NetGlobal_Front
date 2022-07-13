import React from "react";
import { Avatar, Grid, Typography, Button, Box } from "../../styles/material";
import StatsCard from "../../commons/StatsCard";
import {
  AssignmentInd,
  Business,
  VisibilityOutlined,
} from "../../styles/materialIcons";
import EditGuard from "./EditGuard";
import { Link } from "react-router-dom";

const GuardCard = ({ selected }) => {
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
        <EditGuard selected={selected} />
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
      <Grid container display="flex" justifyContent="center" gap={5}>
        <Grid item xs={4}>
          <StatsCard
            icon={<AssignmentInd sx={{ fontSize: 30, color: "#8757DF" }} />}
            value={selected.workedHours}
            description="Horas"
          />
        </Grid>
        <Grid item xs={4}>
          <StatsCard
            icon={<Business sx={{ fontSize: 30, color: "#8757DF" }} />}
            value={selected.tasks}
            description="Tareas"
          />
        </Grid>
      </Grid>
      <Link to={`${selected.id}`}>
      <Button
        variant="outlined"
        sx={{
          color: "#8757DF",
          borderColor: "#8757DF",
          "&:hover": { borderColor: "#8757DF" },
        }}
        startIcon={<VisibilityOutlined color="#8757DF" />}
      >
        Ver Calendario
      </Button>
      </Link>
    </Grid>
  );
};

export default GuardCard;
