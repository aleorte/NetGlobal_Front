import React from "react";
import {
  Avatar,
  Button,
  Paper,
  Box,
  Grid,
  LockOutlinedIcon,
  Typography,
  EmailIcon,
} from "../../styles/material";
import { LoginImage } from "./loginStyles";
import LoginForm from "../../components/organism/LoginForm";

export default function Login() {
  
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid container component={Paper} elevation={6} sx={{ mx: { xs: 0, lg: 12 }, my: { xs: 0, md: "auto" } }}>
        <LoginForm />
        <LoginImage item xs={false} sm={4} md={6} />
      </Grid>
    </Grid>
  );
}
