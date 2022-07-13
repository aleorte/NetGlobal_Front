import { Paper, Avatar, Grid,Box } from "../../../styles/material";
import React, { useEffect, useState } from "react";
import { styleBoxCalendar,styleGridCalendar } from "./style";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import StatsCard from "../../../commons/StatsCard";
import {
    AssignmentInd,
} from "../../../styles/materialIcons";

import { getGuard } from "../../../state/guards";

export const CalendarBoxGuard = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { guard } = useSelector((state) => state.guard);
  const [oneGuard,setOneGuard]=useState({})

  useEffect(() => {
    const asynkFun=async ()=>{
      try{
        const result=await dispatch(getGuard(params.guardId))
        setOneGuard(result)
      }
      catch(err){
        console.log(err)
      }
    }
    asynkFun()
  }, []);

    return guard?(
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
           src={guard.image}
        >
        {guard.name}
        </Avatar>
        <Grid item sx={styleGridCalendar}>
        <StatsCard
            icon={<AssignmentInd sx={{ fontSize: 30, color: "#8757DF" }} />}
            description="Vigilador"
          />
        <Box>Nombre: {`${guard.name} ${guard.lastName}`}</Box>
        <Box>CUIT:{guard.cuil}</Box>
        <Box>Localidad: {guard.location}</Box>
        <Box>Calle:{guard.street} Número:{guard.number}</Box>
        </Grid>
      </Paper>
    ):null;
  }