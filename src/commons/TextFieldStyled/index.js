import React from "react";
import { TextField,InputAdornment } from "../../styles/material";

const TextFieldStyled = ({ adornment, ...props }) => {
  return (
    <TextField
      {...props}
      margin="normal"
      required
      fullWidth
      autoComplete="off"
      autoFocus
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{adornment}</InputAdornment>
        ),
      }}
    />
  );
};

export default TextFieldStyled;
