import React from 'react';
import { MobileStepper,Button } from '../../styles/material';
import { KeyboardArrowRight,KeyboardArrowLeft} from '../../styles/materialIcons'

const StepperActionsResponsive = ({maxSteps,activeStep,handleNext,handleBack}) => {
    return ( 
        <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        sx={{display:{sm:'none'}}}

        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}>
            Next
            <KeyboardArrowRight /> 
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeft />
            Back
          </Button>
        }
      />
     );
}
 
export default StepperActionsResponsive;