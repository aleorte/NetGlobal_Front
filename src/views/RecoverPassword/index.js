import * as React from "react";
import PropTypes from "prop-types";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { EmailIcon } from "../../styles/material";
import FiberPinIcon from "@mui/icons-material/FiberPin";
import LockIcon from "@mui/icons-material/Lock";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import StepConnectorStyled from "../../components/atom/StepConnectorStyled";
import StepIconStyled from "../../components/atom/StepIconStyled";

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

const steps = [
  "Insert email account",
  "Copy email code",
  "Create new password",
];

export default function CustomizedSteppers() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        my={8}
        mx="auto"
        container
        xs={12}
        md={7}
        component={Paper}
        elevation={6}
      >
        <Box sx={{ width: "100%",p:5 }}>
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
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        </Box>
      </Grid>
    </Grid>
  );
}
