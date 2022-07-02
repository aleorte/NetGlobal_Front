import React, { useState } from "react";
import StepperBody from "./StepperBody";
import { Box, Grid, LinearProgress } from "../../styles/material";
import StepOne from "./Steps/StepOne";
import StepTwo from "./Steps/StepTwo";
import StepThree from "./Steps/StepThree";
import { useSelector } from "react-redux";

const Stepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const recover = useSelector(state=>state.recover)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const stepsProps = {
    handleNext:handleNext,
    handleBack:handleBack,
    activeStep:activeStep,
    steps:3
  }

  const steps = [
    {
      element: <StepOne {...stepsProps} label="Ingrese su email"/>,
      label: "Ingresar email"
    },
    {
      element: <StepTwo {...stepsProps} label="Copie el codigo enviado al email asociado"/>,
      label: "Confirmar codigo"
    },
    {
      element: <StepThree {...stepsProps} label="Confirme su nueva contraseña"/>,
      label: "Crear contraseña"
    }
  ];

  return (
    <Box
      display="flex"
      flexDirection="column"
      position="relative"
      justifyContent={{ md: "space-around", xs: "center" }}
      gap={4}
      sx={{ width: "100%", px: 5,pt:5,pb: 3 }}
    >
      {recover.loading && <LinearProgress sx={{position:"absolute",top:0,left:0,width:"100%",height:"2px"}}/>}
      <StepperBody activeStep={activeStep} steps={steps} />

      <Grid container display="flex" justifyContent="center">
        {steps[activeStep].element}
      </Grid>
    </Box>
  );
};

export default Stepper;
