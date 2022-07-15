import React from 'react';
import { FormControlLabel,Checkbox } from '../../styles/material';

const CheckBoxStyled = () => {
    return ( 
        <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Recordar contraseña"
        />
     );
}
 
export default CheckBoxStyled;