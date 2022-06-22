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

const StepperBody = ({activeStep,steps,isStepSkipped}) => {
    return ( 
        <Stepper activeStep={activeStep} connector={<StepConnectorStyled />}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel
                    StepIconComponent={ColorlibStepIcon}
                    {...labelProps}
                  >
                    {label}
                  </StepLabel>
                </Step>
              );
            })}
        </Stepper>
     );
}
 
export default StepperBody;