import { styled } from "@mui/system";
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

export const StepConnectorStyled = styled(StepConnector)(({ theme }) => ({
  "@keyframes activeConnector": {
    "0%": {
      width:0
    },
    "100%": {
      width:'100%'
    }
  },
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage: 'linear-gradient( 95deg,purple 0%,blue 100%)',
        animation: "activeConnector 0.5s linear"
      },
    }, 
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage: 'linear-gradient( 95deg,purple 0%,blue 100%)',
        animation: "activeConnector 0.5s linear"
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderRadius: 1,
    },
  }));

  export const StepIconStyled = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    "@keyframes activeIcon": {
      "100%": {
        background:'linear-gradient( 136deg, purple 0%, blue 100%)'
      }
    },
    ...(ownerState.active && {
      transition:"background 0.4s linear 0.5s",
      background:'blue',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
      transition:"background 0.4s linear 0.5s",
      background:'blue',
      backgroundImage: 'linear-gradient( 136deg, purple 0%, blue 100%)',
    }),
  }));

  export const stepVariants = {
    hidden:{
      x:"30vw",
      opacity:0
    },
    visible:{
      opacity:1,
      x:"0",
      transition:{duration:0.7}
    },
  }


