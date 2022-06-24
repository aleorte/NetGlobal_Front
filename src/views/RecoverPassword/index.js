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
        elevation={6}
        item
        height="700px"
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
