import React,{ useEffect } from "react";
import { motion } from "framer-motion";
import TextFieldStyled from "../../../commons/TextFieldStyled";
import StepperActions from "../StepperActions";
import { Typography,Box } from "../../../styles/material";
import { stepVariants } from "../stepperStyles";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { validationLogin } from "../../../utils/validations";
import { sendMailRecover } from "../../../state/recoverpassword";
import { useSelector,useDispatch } from "react-redux";
import { DraftsIcon } from "../../../styles/materialIcons";

const StepOne = ({handleNext,handleBack,activeStep,steps,label}) => {

  const {register,watch,formState:{errors},setError} = useForm({resolver:yupResolver(validationLogin),mode:"onBlur"})
  const recover = useSelector(state=>state.recover)
  const dispatch = useDispatch()
  const email = watch('email')

  useEffect(()=>{
    if (recover.error || !recover.data.email){
      recover.error && setError('email', { type: 'custom', message: 'La cuenta no se encuentra registrada' })
      return
    }
    handleNext()
  },[recover,handleNext,setError])

  const Next = ()=>{
    if (errors.email) return
    dispatch(sendMailRecover(email))
  }

  return (
  <>
    <motion.div variants={stepVariants} initial="hidden" animate="visible" style={{height:"250px",width:"400px",display:"flex",flexDirection:"column",alignItems:"center",gap:"1rem"}}>
      <Box px={1} pt={1} sx={{backgroundColor:"#F7F4F8",borderRadius:"5px",width:"max-content"}} >
        <DraftsIcon sx={{fontSize:"70px"}} color="primary"/>
      </Box>
      <Typography mb={2} variant="h5" fontWeight={800}>
        {label}
      </Typography>
      <Typography>
        Enviaremos un codigo de verificacion a su casilla de correo
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
        isLoading = {recover.loading}
    />
  </>
  );
};

export default StepOne;
