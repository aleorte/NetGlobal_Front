import React,{ useEffect } from "react";
import { motion } from "framer-motion";
import TextFieldStyled from "../../../commons/TextFieldStyled";
import StepperActions from "../StepperActions";
import { Typography } from "../../../styles/material";
import { stepVariants } from "../stepperStyles";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { validationLogin } from "../../../utils/validations";
import { sendMailRecover } from "../../../state/recoverpassword";
import { useSelector,useDispatch } from "react-redux";


const StepOne = ({handleNext,handleBack,activeStep,steps,label}) => {

  const {register,watch,formState:{errors}} = useForm({resolver:yupResolver(validationLogin),mode:"onBlur"})
  const recover = useSelector(state=>state.recover)
  const dispatch = useDispatch()
  const email = watch('email')

  useEffect(()=>{
    if (recover.error || !recover.email) return
    handleNext()
  },[recover,handleNext])

  const Next = ()=>{
    handleNext()
  }

  return (
  <>
    <motion.div variants={stepVariants} initial="hidden" animate="visible" style={{height:"250px"}}>
      <Typography mb={2}>
        {label}
      </Typography>
      <TextFieldStyled
        label="Email Address"
        name="email"
        register={{ ...register("email") }}
        errors={errors.email}
      />
    </motion.div>
    <StepperActions 
        handleNext={Next} 
        handleBack={handleBack}
        activeStep={activeStep}
        steps={steps}
    />
  </>
  );
};

export default StepOne;
