import React,{ useEffect } from 'react';
import { Box, Button,MobileStepper } from "../../styles/material";
import { KeyboardArrowRight,KeyboardArrowLeft} from '../../styles/materialIcons'

const StepperActions = ({ handleNext, handleBack, activeStep, steps }) => {
  console.log(activeStep)
  console.log(steps)
  console.log((activeStep === 0) || (activeStep === (steps - 1)))

  useEffect(()=>{
    console.log("renderizo")
  },[])

  return (
    <Box width="100%">
      <Box
        sx={{
          display: { xs: "none", sm: "flex" },
          flexDirection: "row",
          pt: 2,
        }}
      >
        <Button
          color="inherit"
          disabled={(activeStep === 0) || (activeStep === (steps - 1))}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        <Button onClick={handleNext}>
          {(activeStep === steps - 1) ? "Finish" : "Next"}
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
            disabled={activeStep === 2}
          >
            Next
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={(activeStep === 0) || (activeStep === (steps - 1)) }>
            <KeyboardArrowLeft />
            Back
          </Button>
        }
      />
    </Box>
  );
};

export default StepperActions;
