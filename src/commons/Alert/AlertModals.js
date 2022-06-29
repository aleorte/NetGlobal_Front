import React,{useState} from "react";
import { Snackbar,MuiAlert } from "../../styles/material"

const AlertModals = () => {

  const [snackbarMode,SetSnackbarMode]=useState(true)

  const handleClose=(event, reason)=>{
    if(reason === "clickaway"){
        return;
    }
    SetSnackbarMode(false)
  }


  return (
    <Snackbar open={snackbarMode} autoHideDuration={3000} onClose={handleClose}>
      <MuiAlert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        La compañía fue crada con exito!
      </MuiAlert>
    </Snackbar>
  );
};

export default AlertModals;

