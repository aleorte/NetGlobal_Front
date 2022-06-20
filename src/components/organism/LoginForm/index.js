import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { LockOutlinedIcon } from "../../../styles/material";
import { EmailIcon } from "../../../styles/material";
import Typography from "@mui/material/Avatar";
import TextFieldStyled from "../../molecule/TextFieldStyled";
import PasswordField from "../../molecule/PasswordField";
import CheckBoxStyled from "../../molecule/CheckBoxStyled";
import LoginOptions from "../../molecule/LoginOptions";
import Copyright from "../../molecule/Copyright";
import { Button } from "../../../styles/material";

const LoginForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Grid item xs={12} sm={8} md={6} square>
      <Box
        sx={{
          my: 8,
          mx: { xs: 4, md: 12 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <TextFieldStyled
            name="email"
            label="Email Address"
            adornment={<EmailIcon color="primary" />}
          />
          <PasswordField />
          <CheckBoxStyled />
          <Button type="submit" fullWidth variant="contained" sx={{ my: 3 }}>
            Sign In
          </Button>
          <LoginOptions />
          <Copyright />
        </Box>
      </Box>
    </Grid>
  );
};

export default LoginForm;
