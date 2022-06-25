import React, { useEffect } from "react";
import { motion } from "framer-motion";
import PasswordField from "../../../commons/PasswordField";
import StepperActions from "../StepperActions";
import { Typography } from "../../../styles/material";
import { stepVariants } from "../stepperStyles";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { validationLogin } from "../../../utils/validations";
import { sendPasswordRecover } from "../../../state/recoverpassword";
import { useSelector,useDispatch } from "react-redux";


const StepThree = ({handleNext,handleBack,activeStep,steps}) => {

  const {register,watch,formState:{errors}} = useForm({resolver:yupResolver(validationLogin),mode:"onChange"})
  const [password,confirmpassword] = watch(['password','confirmpassword'])
  const recover = useSelector(state=>state.recover)
  const dispatch = useDispatch()

  useEffect(()=>{
    if (recover.error || !recover.success) return
    handleNext()
  },[recover,handleNext])

  const Next = ()=>{
    if (password!==confirmpassword) return
    dispatch(sendPasswordRecover(password))
  }

  return (
    <>
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
          name="confirmpassword"
          label="Confirm Password"
          register={{...register("confirmpassword")}}
          errors={errors.confirmpassword}
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

export default StepThree;