import React from 'react';
import { Box, Button,MobileStepper } from "../../styles/material";
import { KeyboardArrowRight,KeyboardArrowLeft} from '../../styles/materialIcons'

const StepperActions = ({ handleNext, handleBack, activeStep, steps, isLoading }) => {
  
  return (
    <Box width="100%" mt={15}>
      <Box
        sx={{
          display: { xs: "none", sm: "flex" },
          flexDirection: "row"
        }}
      >
        <Button
          color="inherit"
          disabled={(activeStep === 0) || (activeStep === (steps - 1)) || isLoading}
          onClick={handleBack}
          sx={{ mr: 1,fontSize:"15px" }}
        >
          Atras
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        <Button onClick={handleNext} sx={{fontSize:"15px"}} disabled={isLoading}>
          {(activeStep === steps - 1) ? "Finalizar" : "Siguiente"}
        </Button>
      </Box>
      <MobileStepper
        variant="text"
        steps={steps}
        position="static"
        activeStep={activeStep}
        sx={{ display: { sm: "none" } }}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === 2 || isLoading}
            sx={{fontSize:"15px"}}
          >
            Siguiente
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={(activeStep === 0) || (activeStep === (steps - 1)) || isLoading }>
            <KeyboardArrowLeft />
            Atras
          </Button>
        }
      />
    </Box>
  );
};

export default StepperActions;
