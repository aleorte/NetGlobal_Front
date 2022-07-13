import React, { useEffect } from "react";
import { Box, } from "../../styles/material"
import { useSelector,useDispatch } from "react-redux";
import { useParams } from "react-router";
import Footer from '../../components/Footer/Footer'
import { CalendarBranch } from "../../components/Calendar/CalendarBranch";
import { CalendarBox } from "../../components/Calendar/CalendarBox";

const CalendarBranchView = () => {

  const dispatch = useDispatch()
  const { entity } = useParams()
  useEffect(()=>{
    
  },[entity,dispatch])



  return (
    <>
    <Box sx={{ display: "flex" }}>
      <CalendarBox/>
       <CalendarBranch/>
      </Box>
    <Footer/>
    </>
  );
};

export default CalendarBranchView;