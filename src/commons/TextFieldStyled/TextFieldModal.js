import React from "react";
import { TextField,Box } from "../../styles/material";

const TextFieldModals = ({ ...props }) => {

  const msgError = props.errors ? props.errors.message : " "

  return (
    <Box sx={{height:'50px'}}>
      <TextField
        {...props}
        error={props.errors ? true : false}
        helperText={msgError}
        margin="normal"
        fullWidth
        autoComplete="off"
        variant="outlined"
        autoFocus
        {...props.register}
      />
    </Box>
  );
};

export default TextFieldModals;