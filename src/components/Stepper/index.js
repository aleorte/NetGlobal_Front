import * as React from "react";
import StepperBody from "./StepperBody";
import StepperActions from "./StepperActions";
import {
  Box
} from '../../styles/material'

const steps = [
  "Insert email account",
  "Copy email code",
  "Create new password",
];

const Stepper = () => {

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

    return ( 
        <Box sx={{ width: "100%",p:5 }}>
          
          <StepperBody
            activeStep={activeStep}
            steps={steps}
            isStepSkipped={isStepSkipped}
          />  
      
          <StepperActions 
            handleNext={handleNext} 
            handleBack={handleBack}
            activeStep={activeStep}
            steps={steps.length}
          />
          
        </Box>
     );
}
 
export default Stepper;