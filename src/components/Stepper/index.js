import React,{useState} from "react";
import StepperBody from "./StepperBody";
import { Box,Grid } from '../../styles/material'
import StepOne from "./Steps/StepOne";
import StepTwo from "./Steps/StepTwo"
import StepThree from "./Steps/StepThree";

const Stepper = () => {

  const [activeStep, setActiveStep] = useState(0);
  
  const verifyCode = ()=>{
    
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  const steps = [
    {label:"Insert email account",element:<StepOne handleNext={handleNext} handleBack={handleBack} activeStep={activeStep} steps={3}/>},
    {label:"Copy email code",element:<StepTwo handleNext={handleNext} handleBack={handleBack} activeStep={activeStep} steps={3}/>},
    {label:"Create new password",element:<StepThree handleNext={handleNext} handleBack={handleBack} activeStep={activeStep} steps={3}/>},
  ];

    return ( 
        <Box display="flex" flexDirection="column" justifyContent={{md:"space-between",xs:"center"}} gap={8} sx={{ width: "100%",p:5 }}>
          
          <StepperBody
            activeStep={activeStep}
            steps={steps}
          /> 

          <Grid container display="flex" justifyContent="center" height="250px"> 
            <Grid item xs={7} display="flex" alignItems="center" flexDirection="column">                   
                {steps[activeStep].element}     
            </Grid>
          </Grid>

        </Box>
     );
}
 
export default Stepper;