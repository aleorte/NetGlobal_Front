import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PasswordField from "../../../commons/PasswordField";
import StepperActions from "../StepperActions";
import {
  Typography,
  Grid,
  LinearProgress,
  Popover,
} from "../../../styles/material";
import { stepVariants } from "../stepperStyles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationLogin } from "../../../utils/validations";
import { sendPasswordRecover } from "../../../state/recoverpassword";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { restart } from "../../../state/recoverpassword";
import { setAlert } from "../../../state/alert";

const StepThree = ({ handleNext, handleBack, activeStep, steps, label }) => {
  const {
    register,
    watch,
    formState: { errors },
    setError,
  } = useForm({ resolver: yupResolver(validationLogin), mode: "onChange" });
  const [password, confirmpassword] = watch(["password", "confirmpassword"]);
  const recover = useSelector((state) => state.recover);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const passwordValidations = [
    { label: "Al menos una letra masyuscula", exp: /[A-Z]/g },
    { label: "Al menos una letra minuscula", exp: /[a-z]/g },
    { label: "Al menos un numero", exp: /[1-9]/g },
    { label: "Minimo 6 caracteres", exp: /^.{6,}$/g },
  ];
  const [porcValidation, setPorcValidation] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const calcValidation = (pass) => {
    const porcValue =
      (passwordValidations.reduce(
        (ac, val) => ac + Number(val.exp.test(pass)),
        0
      ) /
        passwordValidations.length) *
      100;
    return porcValue;
  };

  useEffect(() => {
    if (recover.error || !recover.success) return;
    dispatch(restart());
    dispatch(
      setAlert({
        severity: "success",
        message: "La contraseña ha sido modificada con exito!",
      })
    );
    navigate("/login");
  }, [recover, navigate, dispatch]);

  useEffect(() => {
    setPorcValidation(calcValidation(password));
  }, [password]);

  const Next = () => {
    if (password !== confirmpassword) {
      setError("password", {
        type: "custom",
        message: "El password debe coincidir con la confirmación",
      });
      setError("confirmpassword");
      return;
    } else if (porcValidation < 60) {
      setError("password", {
        type: "custom",
        message: "El password no es lo suficientemente seguro",
      });
      return;
    }
    dispatch(sendPasswordRecover(password));
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <motion.div
        variants={stepVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        style={{
          height: "250px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Typography my={2} variant="h5" fontWeight={800}>
          {label}
        </Typography>
        <Grid container flexDirection="column">
          <PasswordField
            name="password"
            label="Password"
            register={{ ...register("password") }}
            errors={errors.password}
          />
          <LinearProgress
            variant="determinate"
            value={porcValidation}
            color={
              porcValidation > 80
                ? "success"
                : porcValidation > 50
                ? "warning"
                : "error"
            }
            sx={{ width: "100%", mb: 1.5 }}
            aria-owns={open ? "mouse-over-popover" : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          />
          <Popover
            id="mouse-over-popover"
            sx={{
              pointerEvents: "none",
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            {passwordValidations.map((val) => (
              <Typography key={val.label} p={1}> {val.label} </Typography>
            ))}
          </Popover>
          <PasswordField
            name="confirmpassword"
            label="Confirm Password"
            register={{ ...register("confirmpassword") }}
            errors={errors.confirmpassword}
          />
        </Grid>
      </motion.div>
      <StepperActions
        handleNext={Next}
        handleBack={handleBack}
        activeStep={activeStep}
        steps={steps}
      />
    </>
  );
};

export default StepThree;
