import * as React from "react";
import Stepper from '../../components/Stepper'
import {
  Grid,
  Paper,
} from '../../styles/material'
import theme from '../../styles/theme'
import useMediaQuery from '@mui/material/useMediaQuery';

export default function RecoverPassword() {

  const matches = useMediaQuery(theme.breakpoints.up('md'));
  
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        elevation={matches ? 6 : 0 }
        item
        mx="auto"
        my="auto"
        container
        xs={12}
        md={7}
        component={Paper}
      >
        <Stepper/>
      </Grid>
    </Grid>
  );
}
