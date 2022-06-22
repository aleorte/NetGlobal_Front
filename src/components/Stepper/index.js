import React from "react";
import StepperBody from "./StepperBody";
import StepperActions from "./StepperActions";
import { Box,Grid, Typography } from '../../styles/material'
import TextFieldStyled from "../../commons/TextFieldStyled";
import { PinInput } from 'react-input-pin-code';

const Stepper = () => {

  const [activeStep, setActiveStep] = React.useState(0);
  const [pinValues, setPinValues] = React.useState(['', '', '','']);
  const [isCorrect,setIsCorrect] = React.useState("")

  const verifyCode = ()=>{
    console.log(pinValues.join(""))
    if (pinValues.join("")==="1234"){
        setIsCorrect("correct")
    }else{
        setIsCorrect("incorrect")
    }
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const StepOne = ()=>{
    return(
        <TextFieldStyled label="Email Address" name="email"/>
    )
  }

  const StepTwo = ()=>{
    return(
        <PinInput
        values={pinValues}
        size="lg"
        onChange={(value, index, values) => setPinValues(values)}
        autoTab= {true}
        inputClassName="correct"
        showState={false}
        onComplete = {()=>{verifyCode()}}
        />
    )
  }

  const StepThree = ()=>{

  }

  const steps = [
    {label:"Insert email account",element:<StepOne/>,msg:"Please, enter your email and a notification will be sent to you"},
    {label:"Copy email code",element:<StepTwo/>,msg:"Insert the code"},
    {label:"Create new password",element:<StepOne/>,msg:"Confirm new password"},
  ];

    return ( 
        <Box display="flex" flexDirection="column" justifyContent="space-between" sx={{ width: "100%",p:5 }}>
          
          <StepperBody
            activeStep={activeStep}
            steps={steps}
          /> 

          <Grid container display="flex" justifyContent="center"> 
            <Grid item xs={7} display="flex" alignItems="center" flexDirection="column">
                <Typography mb={2}>
                     {steps[activeStep].msg}
                </Typography>
                {steps[activeStep].element}
            </Grid>
          </Grid>

          <StepperActions 
            handleNext={handleNext} 
            handleBack={handleBack}
            activeStep={activeStep}
            steps={steps}
          />
          
        </Box>
     );
}
 
export default Stepper;