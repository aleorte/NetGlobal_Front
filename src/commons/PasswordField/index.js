import React,{useState} from "react";
import {
  TextField,
  InputAdornment,
} from '../../styles/material'
import {
  IconButton,
  VisibilityOff,
  Visibility,
  LockIcon
} from '../../styles/materialIcons'

const PasswordField = (props) => {

  const [textVisibility,settextVisibility] = useState(false)
  const msgError = props.errors ? props.errors.message : " "

  return (
      <TextField
        {...props}
        {...props.register}
        margin="normal"
        error={props.errors ? true : false}
        helperText={msgError}
        fullWidth
        type={textVisibility ? 'text' : 'password'}
        autoComplete="current-password"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon color="primary" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={()=>{settextVisibility(!textVisibility)}}
                edge="end"
              >
                {textVisibility ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
  );
};

export default PasswordField;
