import React, { useEffect } from "react";
import GuardCard from "./GuardCard";
import GuardCells from "./GuardCells";
import guardHeaders from "./guardHeaders";
import { useSelector,useDispatch } from "react-redux";
import { getGuards } from "../../state/guards";
import Dashboard from "../../commons/Dashboard";

const Guards = () => {

  const dispatch = useDispatch()
  const { guards } = useSelector(state=>state.guard)
  
  useEffect(()=>{
    dispatch(getGuards())
  },[])

  const guardData = {
    data: guards ,
    headers:guardHeaders, 
    Card:GuardCard, 
    Cells:GuardCells,
    label:"Vigiladores",
  }

  return (
    <Dashboard {...guardData}/>
  )
}
export default Guards;