import React, { useState } from "react";
import StepperBody from "./StepperBody";
import { Box, Grid } from "../../styles/material";
import StepOne from "./Steps/StepOne";
import StepTwo from "./Steps/StepTwo";
import StepThree from "./Steps/StepThree";

const Stepper = () => {
  const [activeStep, setActiveStep] = useState(0);

  const verifyCode = () => {};

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
      element: <StepOne {...stepsProps} label="Ingrese el email de la cuenta a recuperar"/>,
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
      justifyContent={{ md: "space-around", xs: "center" }}
      gap={10}
      sx={{ width: "100%", p: 5 }}
    >
      <StepperBody activeStep={activeStep} steps={steps} />

      <Grid container display="flex" justifyContent="center">
        {steps[activeStep].element}
      </Grid>
    </Box>
  );
};

export default Stepper;
