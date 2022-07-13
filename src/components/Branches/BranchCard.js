import React from "react";
import {
  Grid,
  Typography,
  Button,
  Box,
} from "../../styles/material";
import StatsCard from "../../commons/StatsCard";
import {
  AssignmentInd,
  VisibilityOutlined,
} from "../../styles/materialIcons";
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom";
import EditBranch from './EditBranch'


const BranchCard = ({ selected }) => {

  const {companyId} = useParams()

  if (!selected.id) return;
  return (
    <Grid
      display="flex"
      justifyContent="space-around"
      position="relative"
      flexDirection="column"
      width="100%"
      height="100%"
      alignItems="center"
    >
      <Box position="absolute" top="5px" right="13px">
        <EditBranch selected={selected} />
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography mt={1} fontWeight={400} fontSize={25}>
          {selected.name}
        </Typography>
      </Box>
      <Grid container display="flex" justifyContent="center" gap={5}>
        <Grid item>
          <StatsCard
            icon={<AssignmentInd sx={{ fontSize: 30, color: "#8757DF" }} />}
            value={4}
            description="Vigiladores"
          />
        </Grid>
      </Grid>
      <Link style={{textDecoration:"none"}} to={`/home/companias/${companyId}/sucursales/${selected.id}`}>
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

export default BranchCard;