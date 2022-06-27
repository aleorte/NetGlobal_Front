import React from "react";
import { Snackbar,MuiAlert } from "../../styles/material"
import { useSelector,useDispatch } from "react-redux";
import { closeAlert } from "../../state/alert";

const Alert = () => {

  const { open } = useSelector(state=>state.alert)
  const dispatch = useDispatch()

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(closeAlert())
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <MuiAlert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        This is a success message!
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;
