import React,{useState} from "react";
import { TextField,InputAdornment,Box } from "../../styles/material";

const TextFieldStyled = ({ colorClick,adornment, ...props }) => {

  const msgError = props.errors ? props.errors.message : " "
  const [selected,setSelected] = useState(false)

  return (
    <Box sx={{height:'95px',width:"100%"}}>
      <TextField
        {...props}
        error={props.errors ? true : false}
        helperText={msgError}
        margin="normal"
        fullWidth
        autoComplete="off"
        variant="outlined"
        sx={{"&.Mui-root":{borderColor: selected ? colorClick : ""} }}
        autoFocus
        onSelect = {()=>{setSelected(true)}}
        onBlur = {()=>{setSelected(false)}}
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
