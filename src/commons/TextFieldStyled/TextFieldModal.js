import React,{useState} from "react";
import { TextField,Box } from "../../styles/material";

const TextFieldModals = ({ ...props }) => {

  const msgError = props.errors ? props.errors.message : " "
  const [selected,setSelected] = useState(false)

  return (
    <Box sx={{height:'70px'}}>
      <TextField
        {...props}
        error={props.errors ? true : false}
        helperText={msgError}
        margin="normal"
        fullWidth
        autoComplete="off"
        variant="outlined"
        autoFocus
        onSelect = {()=>{setSelected(true)}}
        onBlur = {()=>{setSelected(false)}}
        {...props.register}
      />
    </Box>
  );
};

export default TextFieldModals;