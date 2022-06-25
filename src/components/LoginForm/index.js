import React from "react";
import{
  Grid,
  Box,
  Button,
  Typography
} from '../../styles/material'
import { Link } from 'react-router-dom'
import { EmailIcon } from '../../styles/materialIcons'
import TextFieldStyled from "../../commons/TextFieldStyled";
import PasswordField from "../../commons/PasswordField";
import CheckBoxStyled from "../../commons/CheckBoxStyled";
import { loginVariants } from "./loginFormStyles";
import Logo from "../../assets/logo";
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { validationLogin } from "../../utils/validations";
import { useDispatch,useSelector } from "react-redux";
import { sendLoginRequest } from "../../state/user";

const LoginOptions = () => {
    return (
      <Grid container>
        <Grid item xs>
            <Link style={{color:'#1976d2'}} to="/recover">
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
        <a style={{color:'inherit'}} href="https://netglobal.tech/">
          NetGlobal
        </a>
        {" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
};

const LoginForm = () => {

  const {register,handleSubmit,formState:{errors}} = useForm({resolver:yupResolver(validationLogin)})
  const dispatch = useDispatch()
  const user = useSelector(state=>state.user)

  const onSubmit = (data)=>{
    dispatch(sendLoginRequest(data))
  }

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
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
            <TextFieldStyled
              name="email"
              label="Email Address"
              adornment={<EmailIcon color="primary" />}
              register={{...register("email")}} 
              errors={errors.email}
            />
          <PasswordField 
            name="password"
            label="Password"
            register={{...register("password")}}
            errors={errors.password}
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