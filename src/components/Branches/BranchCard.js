import React, { useEffect } from "react";
import {
  Grid,
  Typography,
  Button,
  Box,
  Avatar
} from "../../styles/material";
import StatsCard from "../../commons/StatsCard";
import {
  AssignmentInd,
  VisibilityOutlined,
} from "../../styles/materialIcons";
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom";
import EditBranch from './EditBranch'
import { useSelector, useDispatch } from 'react-redux'
import { getCompany } from "../../state/company";

const BranchCard = ({ selected }) => {

  const { companyId } = useParams()
  const { company } = useSelector(state=>state.company)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getCompany(companyId))
  },[])

  if (!selected.id || !company) return;
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
        <Avatar
          sx={{
            height: "120px",
            width: "120px",
            backgroundSize: "cover",
            border: "1px solid black",
          }}
          src={company?.logo}
        >
          {company.legalName[0]}
        </Avatar>
        <Typography mt={1} fontWeight={400} fontSize={25}>
          {selected.name}
        </Typography>
      </Box>
      <Grid container display="flex" justifyContent="center" gap={5}>
        <Grid item>
          <StatsCard
            icon={<AssignmentInd sx={{ fontSize: 30, color: "#8757DF" }} />}
            value={selected.guards}
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