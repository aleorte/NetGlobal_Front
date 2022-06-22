import React from 'react';
import { FormControlLabel,Checkbox } from '../../styles/material';

const CheckBoxStyled = () => {
    return ( 
        <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
        />
     );
}
 
export default CheckBoxStyled;