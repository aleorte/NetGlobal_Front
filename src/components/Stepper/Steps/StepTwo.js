import React,{useEffect, useState} from "react";
import { motion } from "framer-motion";
import StepperActions from "../StepperActions";
import { Typography } from "../../../styles/material";
import { stepVariants } from "../stepperStyles";
import { PinInput } from 'react-input-pin-code';
import { sendCodeRecover } from "../../../state/recoverpassword";
import { useSelector,useDispatch } from "react-redux";


const StepTwo = ({handleNext,handleBack,activeStep,steps,label}) => {

  const [pinValues, setPinValues] = useState(['', '', '', '']);
  const recover = useSelector(state=>state.recover)
  const dispatch = useDispatch()

  useEffect(()=>{
    if (recover.error || !recover.code) return
  },[recover,handleNext])

  const Next = ()=>{
    /* if (pinValues.some((value)=>value==="")) return
    const stringCode = pinValues.join("")
    dispatch(sendCodeRecover(stringCode)) */
    handleNext()
  }

  return (
    <>
    <motion.div variants={stepVariants} initial="hidden" animate="visible" exit="exit" style={{height:"250px"}} >
      <Typography mb={2}>
        {label}
      </Typography>
        <PinInput
          values={pinValues}
          size="lg"
          onChange={(value, index, values) => setPinValues(values)}
          autoTab= {true}
          inputClassName="correct"
          showState={false}
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

export default StepTwo;