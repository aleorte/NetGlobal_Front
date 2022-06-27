import React from "react";
import { TextField,InputAdornment,Box } from "../../styles/material";

const TextFieldStyled = ({ adornment, ...props }) => {

  const msgError = props.errors ? props.errors.message : " "

  return (
    <Box sx={{height:'95px'}}>
      <TextField
        {...props}
        error={props.errors ? true : false}
        helperText={msgError}
        margin="normal"
        fullWidth
        autoComplete="off"
        variant="outlined"
        autoFocus
        InputProps={{
          startAdornment: (
             <InputAdornment position="start">{adornment}</InputAdornment>
          ),
        }}
        {...props.register}
      />
    </Box>
  );
};

export default TextFieldStyled;
