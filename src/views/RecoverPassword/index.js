import * as React from "react";
import Stepper from '../../components/Stepper'
import {
  Grid,
  Paper,
} from '../../styles/material'

export default function RecoverPassword() {
  
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        my={8}
        mx="auto"
        container
        xs={12}
        md={7}
        component={Paper}
        elevation={2}
      >
        <Stepper/>
      </Grid>
    </Grid>
  );
}
