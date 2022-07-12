import { Box,Avatar } from "../../../styles/material"
import React, { useEffect, useState } from "react";
import {styleBoxCalendar} from "./style"
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCompany } from "../../../state/company";

export const CalendarBox=()=>{
const dispatch=useDispatch()
const params=useParams()
const company = useSelector((state) => state.company)

useEffect(()=>{
    dispatch(getCompany(params.companyId))
},[])


    return (
        <Box sx={styleBoxCalendar}>
        <Avatar
          sx={{
            marginTop:"15px",
            marginLeft:"15px",
            height: "120px",
            width: "120px",
            backgroundSize: "cover",
            border: "1px solid black",
          }}
          src={company.logo}
        >
          {company.legalName}
        </Avatar>
        </Box>
    )
}