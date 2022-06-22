import React from "react";
import{
  Grid,
  Box,
  Avatar,
  Button,
  Link,
  Typography
} from '../../styles/material'
import { EmailIcon,LockOutlinedIcon } from '../../styles/materialIcons'
import TextFieldStyled from "../../commons/TextFieldStyled";
import PasswordField from "../../commons/PasswordField";
import CheckBoxStyled from "../../commons/CheckBoxStyled";

const LoginOptions = () => {
    return (
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item md={12} xl={5}>
          <Link href="#" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    );
};

const Copyright = () => {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ mt: 5 }}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://netglobal.tech/">
          NetGlobal
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  };


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