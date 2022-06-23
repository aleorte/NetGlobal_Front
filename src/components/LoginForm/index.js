import React from "react";
import{
  Grid,
  Box,
  Button,
  Link,
  Typography
} from '../../styles/material'
import { EmailIcon,LockOutlinedIcon } from '../../styles/materialIcons'
import TextFieldStyled from "../../commons/TextFieldStyled";
import PasswordField from "../../commons/PasswordField";
import CheckBoxStyled from "../../commons/CheckBoxStyled";
import Logo from "../../assets/logo";
import { motion } from 'framer-motion'

const LoginOptions = () => {
    return (
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            Forgot password?
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

const loginVariants = {
  hidden:{
    opacity:0
  },
  visible:{
    opacity:1,
    transition:{duration:3,ease: "easeInOut"}
  }
}


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
      <Box
        sx={{
          my: 8,
          mx: { xs: 4, md: 12 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
          <Logo/>
        <motion.div variants={loginVariants} initial="hidden" animate="visible">
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <TextFieldStyled
            name="email"
            label="Email Address"
            adornment={<EmailIcon color="primary" />}
          />
          <PasswordField 
            name="password"
            label="Password"
          />
          <CheckBoxStyled />
          <Button type="submit" fullWidth variant="contained" sx={{ my: 3 }}>
            Sign In
          </Button>
          <LoginOptions />
          <Copyright />
        </Box>
        </motion.div>
      </Box>
  );
};

export default LoginForm;