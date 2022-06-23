import React from "react";
import StepperBody from "./StepperBody";
import StepperActions from "./StepperActions";
import { Box,Grid, Typography } from '../../styles/material'
import TextFieldStyled from "../../commons/TextFieldStyled";
import PasswordField from '../../commons/PasswordField'
import { PinInput } from 'react-input-pin-code';
import { motion } from 'framer-motion'

const Stepper = () => {

  const [activeStep, setActiveStep] = React.useState(0);
  const [pinValues, setPinValues] = React.useState(['', '', '','']);
  const [isCorrect,setIsCorrect] = React.useState("")

  const pathVariants = {
    hidden:{
      height:0,
    },
    visible:{
      height:80,
      transition:{
        duration:2,
        ease: "easeInOut"
      }
    }
  }

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
      <>
        <TextFieldStyled label="Email Address" name="email"/>
        <motion.svg height="200" width="200" initial="hidden" animate="visible">
          <motion.rect variants={{hidden:{height:0,},visible:{height:80,transition:{duration:2,ease: "easeInOut"}}}} x="0" y="100"  width="30" stroke="black" transform="rotate(180 15,140)"/>
          <motion.rect variants={{hidden:{height:0,},visible:{height:100,transition:{duration:2,ease: "easeInOut"}}}} x="35" y="80" width="30" height="90" stroke="black" transform="rotate(180 50,130)"/>
          <motion.rect variants={{hidden:{height:0,},visible:{height:120,transition:{duration:2,ease: "easeInOut"}}}} x="70" y="60" width="30" height="90" stroke="black" transform="rotate(180 85,120)"/>
          <motion.rect variants={{hidden:{height:0,},visible:{height:140,transition:{duration:2,ease: "easeInOut"}}}} x="105" y="40" width="30" height="90" stroke="black" transform="rotate(180 120,110)"/>
          <polygon points="0,150 70,183 0,183" fill="white"/>
          <polygon points="65,183 145,155 145,183" fill="white"/>
        </motion.svg>
      </>
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
    return(
      <>
        <PasswordField 
          name="password"
          label="Password"
        />
        <PasswordField
          name="confirm_password"
          label="Confirm Password"
        />
      </>
    )
  }

  const steps = [
    {label:"Insert email account",element:<StepOne/>,msg:"Please, enter your email and a notification will be sent to you"},
    {label:"Copy email code",element:<StepTwo/>,msg:"Insert the code"},
    {label:"Create new password",element:<StepThree/>,msg:"Confirm new password"},
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