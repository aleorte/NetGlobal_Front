import React from "react";
import StepperBody from "./StepperBody";
import StepperActions from "./StepperActions";
import StepperActionsResponsive from "./StepperActionsResponsive";
import { Box,Grid, Typography } from '../../styles/material'
import TextFieldStyled from "../../commons/TextFieldStyled";
import PasswordField from '../../commons/PasswordField'
import { PinInput } from 'react-input-pin-code';
import { AnimatePresence, motion } from 'framer-motion'

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

  const stepVariants = {
    hidden:{
      x:"30vw",
      opacity:0
    },
    visible:{
      opacity:1,
      x:"0",
      transition:{duration:0.7}
    },
  }

  const StepOne = ()=>{
    return(
      <motion.div variants={stepVariants} initial="hidden" animate="visible" >
        <Typography mb={2}>
            Please, enter your email and a notification will be sent to you
        </Typography>
        <TextFieldStyled label="Email Address" name="email"/>
      </motion.div>
    )
  }

  const StepTwo = ()=>{
    return(
      <motion.div variants={stepVariants} initial="hidden" animate="visible" exit="exit" >
      <Typography mb={2}>
        Insert the code
      </Typography>
        <PinInput
          values={pinValues}
          size="lg"
          onChange={(value, index, values) => setPinValues(values)}
          autoTab= {true}
          inputClassName="correct"
          showState={false}
          onComplete = {()=>{verifyCode()}}
        />
      </motion.div>
    )
  }

  const StepThree = ()=>{
    return(
      <motion.div variants={stepVariants} initial="hidden" animate="visible" exit="exit" >
      <Typography mb={2}>
        Confirm new password
      </Typography>
      <PasswordField 
          name="password"
          label="Password"
      />
      <PasswordField
          name="confirm_password"
          label="Confirm Password"
      />
      </motion.div>
    )
  }

  const steps = [
    {label:"Insert email account",element:<StepOne/>},
    {label:"Copy email code",element:<StepTwo/>},
    {label:"Create new password",element:<StepThree/>},
  ];

    return ( 
        <Box display="flex" flexDirection="column" justifyContent="space-between" sx={{ width: "100%",p:5 }}>
          
          <StepperBody
            activeStep={activeStep}
            steps={steps}
          /> 

          <Grid container display="flex" justifyContent="center"> 
          
            <Grid item xs={7} display="flex" alignItems="center" flexDirection="column">
            <AnimatePresence>                      
                {steps[activeStep].element}     
            </AnimatePresence>
            </Grid>
          </Grid>

          <StepperActions 
            handleNext={handleNext} 
            handleBack={handleBack}
            activeStep={activeStep}
            steps={steps}
          />
          <StepperActionsResponsive 
            handleNext={handleNext} 
            handleBack={handleBack}
            activeStep={activeStep}
            maxSteps={steps.length}
            sx={{display:{md:'none'}}}
          />
          
        </Box>
     );
}
 
export default Stepper;