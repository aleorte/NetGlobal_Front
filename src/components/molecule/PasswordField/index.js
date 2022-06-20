import React,{useState} from "react";
import {TextField,InputAdornment,IconButton,VisibilityOff,Visibility,LockIcon} from '../../../styles/material'

const PasswordField = () => {

  const [textVisibility,settextVisibility] = useState(false)

  return (
    <TextField
      margin="normal"
      required
      fullWidth
      name="password"
      label="Password"
      type={textVisibility ? 'text' : 'password'}
      id="password"
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
