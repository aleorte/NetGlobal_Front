import React, { useEffect,useState } from "react";
import { motion } from "framer-motion";
import PasswordField from "../../../commons/PasswordField";
import StepperActions from "../StepperActions";
import { Typography,Grid } from "../../../styles/material";
import { stepVariants } from "../stepperStyles";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { validationLogin } from "../../../utils/validations";
import { sendPasswordRecover } from "../../../state/recoverpassword";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { restart } from "../../../state/recoverpassword";
import { LockIcon } from "../../../styles/materialIcons";
import { LinearProgress } from '../../../styles/material'
import { setAlert } from '../../../state/alert'


const StepThree = ({handleNext,handleBack,activeStep,steps,label}) => {

  const {register,watch,formState:{errors},setError} = useForm({resolver:yupResolver(validationLogin),mode:"onChange"})
  const [password,confirmpassword] = watch(['password','confirmpassword'])
  const recover = useSelector(state=>state.recover)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const passwordValidations = [/[A-Z]/g,/[a-z]/g,/[1-9]/g,/^.{6,}$/g]
  const [porcValidation,setPorcValidation] = useState(0)

  const calcValidation = (pass)=> {
    const porcValue = (passwordValidations.reduce((ac,val)=> ac + Number(val.test(pass)),0) / passwordValidations.length) * 100
    return porcValue
  }

  useEffect(()=>{
    if (recover.error || !recover.success) return
    dispatch(restart())
    navigate("/login")
  },[recover,navigate,dispatch])

  useEffect(()=>{
    setPorcValidation(calcValidation(password))
  },[password])

  const Next = ()=>{
    if (password!==confirmpassword){
      setError('password', { type: 'custom', message: 'El password debe coincidir con la confirmación'})
      setError('confirmpassword')
      return
    }else if (porcValidation<60){
      setError('password', { type: 'custom', message: 'El password no es lo suficientemente seguro'})
      return
    }
    dispatch(setAlert({severity:"success",message: "La contraseña ha sido modificada con exito!"}))
    dispatch(sendPasswordRecover(password))
  }

  return (
    <>
    <motion.div variants={stepVariants} initial="hidden" animate="visible" exit="exit" style={{height:"250px",display:"flex",flexDirection:"column",alignItems:"center",gap:"1rem"}} >
      <LockIcon sx={{fontSize:"80px"}} color="primary"/>
      <Typography mb={2} variant="h5" fontWeight={800}>
        {label}
      </Typography>
      <Grid container flexDirection="column">
        <PasswordField 
          name="password"
          label="Password"
          register={{...register("password")}}
          errors={errors.password}
        />
        <LinearProgress variant="determinate" value={porcValidation} color={porcValidation>80 ? "success" : (porcValidation>50 ? "warning" : "error")}  sx={{width:"100%"}}/>
        <PasswordField
          name="confirmpassword"
          label="Confirm Password"
          register={{...register("confirmpassword")}}
          errors={errors.confirmpassword}
        />
      </Grid>
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