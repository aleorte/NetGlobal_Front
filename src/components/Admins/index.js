import React, { useEffect } from "react";
import AdminCard from "./AdminCard";
import AdminCells from "./AdminCells";
import adminHeaders from "./adminHeaders";
import { useSelector,useDispatch } from "react-redux";
import { getAdmins } from "../../state/admin";
import Dashboard from "../../commons/Dashboard";

const Admins = () => {

  const dispatch = useDispatch()
  const { admins } = useSelector(state=>state.admin)
  
  useEffect(()=>{
    dispatch(getAdmins())
  },[])

  const adminData = {
    data: admins ,
    headers:adminHeaders, 
    Card:AdminCard, 
    Cells:AdminCells,
    label:"Administradores",
  }

  return (
        <Dashboard {...adminData}/>
  )
}
export default Admins;