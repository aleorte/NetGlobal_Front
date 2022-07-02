import React from "react";
import { Paper, Grid } from "../../styles/material";
import { LoginImage } from "./loginStyles";
import LoginForm from "../../components/LoginForm";
import useMediaQuery from '@mui/material/useMediaQuery';
import theme from '../../styles/theme'

export default function Login() {

  const matches = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Grid
      container
      component="main"
      sx={{ height: 'calc(100vh - 58px)' }}
      display="flex"
      alignContent="center"
    >
      <Grid
        container
        component={Paper}
        elevation={matches ? 6 : 0 }
        sx={{ mx: { xs: 0, lg: 12 }, my: { xs: 0, md: "auto" } }}
      >
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          square="true"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <LoginForm />
        </Grid>
        <LoginImage item xs={false} sm={4} md={6} />
      </Grid>
    </Grid>
  );
}
