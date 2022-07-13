import { Paper, Avatar, Grid } from "../../../styles/material";
import React, { useEffect, useState } from "react";
import { styleBoxCalendar,styleGridCalendar } from "./style";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCompany } from "../../../state/company";
import StatsCard from "../../../commons/StatsCard";
import {Business} from "../../../styles/materialIcons";
import { getBranch } from "../../../state/branch";
import { Box } from "@mui/system";

export const CalendarBox = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { company } = useSelector((state) => state.company);
  const { branch } = useSelector((state) => state.branch);

  useEffect(() => {
    const asynkFun=async ()=>{
      try{
       await Promise.all(dispatch(getCompany(params.companyId)),dispatch(getBranch(params.branchId)))
      }
      catch(err){
        console.log(err)
      }
    }
    asynkFun()
  }, []);

    return company&&branch?(
      <Paper sx={styleBoxCalendar}>
        <Avatar
          sx={{
            marginTop: "15px",
            marginLeft: "70px",
            height: "120px",
            width: "120px",
            backgroundSize: "cover",
            border: "1px solid black",
          }}
          src={company.logo}
        >
        {company.legalName}
        </Avatar>
        <Grid item sx={styleGridCalendar}>
        <StatsCard
        icon={<Business sx={{ fontSize: 30, color: "#8757DF" }} />}
        description="Sucursal"/>
        <Box>Nombre: {branch.name}</Box>
        <Box>CUIT:{branch.cuit}</Box>
        <Box>Localidad: {branch.location}</Box>
        <Box>Calle:{branch.street} Número:{branch.number}</Box>
        </Grid>
      </Paper>
    ):null;
  }
