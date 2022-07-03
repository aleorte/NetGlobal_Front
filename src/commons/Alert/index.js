import React from "react";
import { Snackbar,MuiAlert } from "../../styles/material"
import { useSelector,useDispatch } from "react-redux";
import { closeAlert } from "../../state/alert";

const Alert = () => {

  const { open,severity,message } = useSelector(state=>state.alert)
  const dispatch = useDispatch()

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(closeAlert())
  };

  return (
    <Snackbar anchorOrigin={{ vertical:"top", horizontal:"right" }} open={open} autoHideDuration={6000} onClose={handleClose}>
      <MuiAlert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;
