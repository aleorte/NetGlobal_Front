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
import { useNavigate } from "react-router-dom";
import { restart } from "../../../state/recoverpassword";


const StepThree = ({handleNext,handleBack,activeStep,steps,label}) => {

  const {register,watch,formState:{errors}} = useForm({resolver:yupResolver(validationLogin),mode:"onChange"})
  const [password,confirmpassword] = watch(['password','confirmpassword'])
  const recover = useSelector(state=>state.recover)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
    if (recover.error || !recover.success) return
    dispatch(restart())
    navigate("/login")
  },[recover,navigate,dispatch])

  const Next = ()=>{
    if (password!==confirmpassword) return
    dispatch(sendPasswordRecover(password))
  }

  return (
    <>
    <motion.div variants={stepVariants} initial="hidden" animate="visible" exit="exit" style={{height:"250px"}} >
      <Typography mb={2}>
        {label}
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