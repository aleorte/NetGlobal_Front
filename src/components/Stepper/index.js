import React,{useState} from "react";
import StepperBody from "./StepperBody";
import StepperActions from "./StepperActions";
import StepperActionsResponsive from "./StepperActionsResponsive";
import { Box,Grid, Typography } from '../../styles/material'
import TextFieldStyled from "../../commons/TextFieldStyled";
import PasswordField from '../../commons/PasswordField'
import { PinInput } from 'react-input-pin-code';
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { validationLogin } from "../../utils/validations";

const Stepper = () => {

  const [activeStep, setActiveStep] = useState(0);
  const [pinValues, setPinValues] = useState(['', '', '','']);
  const {register,handleSubmit,formState:{errors}} = useForm({resolver:yupResolver(validationLogin)})

 
  const verifyCode = ()=>{
    
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
        <TextFieldStyled 
          label="Email Address" 
          name="email"
          register={{...register("email")}}
          errors={errors.email}
        />
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
          register={{...register("password")}}
          errors={errors.password}
      />
      <PasswordField
          name="confirm_password"
          label="Confirm Password"
          register={{...register("confirm_password")}}
          errors={errors.password}
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
            sx={{display:{xs:"block",md:'none'}}}
          />
          
        </Box>
     );
}
 
export default Stepper;