import { Box,Button } from '../../styles/material'

const StepperActions = ({handleNext,handleBack,activeStep,steps}) => {
    return ( 
        <>
            <Box sx={{ display:{xs:"none",sm:"flex"}, flexDirection: "row", pt: 2 }}>
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
        </>
     );
}
 
export default StepperActions;