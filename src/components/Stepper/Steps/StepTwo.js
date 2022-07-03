import React,{useEffect, useState} from "react";
import { motion } from "framer-motion";
import StepperActions from "../StepperActions";
import { Typography,Grid,Avatar,Box,Link} from "../../../styles/material";
import { stepVariants } from "../stepperStyles";
import { PinInput } from 'react-input-pin-code';
import { sendCodeRecover,restart } from "../../../state/recoverpassword";
import { useSelector,useDispatch } from "react-redux";
import { PinIcon } from "../../../styles/materialIcons";


const StepTwo = ({handleNext,handleBack,activeStep,steps,label}) => {

  const [pinValues, setPinValues] = useState(['', '', '', '']);
  const [errorPin, setErrorPin] = useState(false)
  const recover = useSelector(state=>state.recover)
  const dispatch = useDispatch()

  useEffect(()=>{
    if (recover.error || !recover.data.code){
      recover.error && setErrorPin(true)
      return
    } 
    handleNext()
  },[recover,handleNext])

  const Next = ()=>{
    if (pinValues.some((value)=>value==="")) return
    const stringCode = pinValues.join("")
    dispatch(sendCodeRecover(stringCode))
  }

  const Back = ()=>{
    dispatch(restart())
    handleBack()
  }

  const onChange = (value,index,values)=>{
    setErrorPin(false)
    setPinValues(values)
  }

  return (
    <>
    <motion.div variants={stepVariants} initial="hidden" animate="visible" exit="exit" style={{height:"250px",display:"flex",flexDirection:"row",alignItems:"center",gap:"3rem"}} >
      <Grid display="flex" flexDirection="column" alignItems="center" gap={1} >
        <Avatar sx={{width:"100px",height:"100px"}} src={recover.data.user?.image}>
          {recover.data.user?.name[0]}
        </Avatar>
        <Box textAlign="center">
          <Typography fontWeight={600}> {recover.data.email}</Typography>
          <Typography sx={{color:"gray"}}> {recover.data?.user?.superAdmin ? "SuperAdmin" : "Administrador"} </Typography>
        </Box>
        <Link sx={{cursor:"pointer"}} onClick={Back}>
          No es mi cuenta
        </Link>
      </Grid>
      <Grid display="flex" flexDirection="column" alignItems="center">
        <PinIcon sx={{fontSize:"70px"}} color="primary"/>
        <Typography mb={2}>
          {label}
        </Typography>
        <PinInput
          values={pinValues}
          size="lg"
          onChange={onChange}
          onFocus={ ()=>{setErrorPin(false)} }
          autoTab= {true}
          inputStyle={{borderColor: errorPin ? "red" : "lightgray"}}
          showState={false}
        />
      </Grid>
    </motion.div>
    <StepperActions 
        handleNext={Next} 
        handleBack={Back}
        activeStep={activeStep}
        steps={steps}
    />
    </>
  );
};

export default StepTwo;