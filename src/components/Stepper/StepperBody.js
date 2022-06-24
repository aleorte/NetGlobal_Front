import {
    Stepper,
    Step,
    StepLabel
} from '../../styles/material'
import {
    FiberPinIcon,
    EmailIcon,
    LockIcon
} from '../../styles/materialIcons'
import PropTypes from "prop-types";
import {StepConnectorStyled,StepIconStyled} from "./stepperStyles";

function ColorlibStepIcon(props) {
    const { active, completed, className } = props;
  
    const icons = {
      1: <EmailIcon />,
      2: <FiberPinIcon />,
      3: <LockIcon />,
    };
  
    return (
      <StepIconStyled
        ownerState={{ completed, active }}
        className={className}
      >
        {icons[String(props.icon)]}
      </StepIconStyled>
    );
}

ColorlibStepIcon.propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    completed: PropTypes.bool,
    icon: PropTypes.node,
};

const StepperBody = ({activeStep,steps}) => {
    return ( 
        <Stepper sx={{display:{xs:'none',sm:'flex'}}} activeStep={activeStep} alternativeLabel connector={<StepConnectorStyled />}>
            {steps.map((e, index) => {
              const stepProps = {};
              const labelProps = {};
              return (
                <Step key={e.label} {...stepProps}>
                  <StepLabel
                    StepIconComponent={ColorlibStepIcon}
                    {...labelProps}
                  >
                    {e.label}
                  </StepLabel>
                </Step>
              );
            })}
        </Stepper>
     );
}
 
export default StepperBody;