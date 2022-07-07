import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import { Button } from '@mui/material';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="https://netglobal.tech/en/home">
       NetGlobal
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function StickyFooter() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: "secondary"
      }}
    >
      <CssBaseline />
      <Box
        component="footer"
        sx={{
          py: 1,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) => theme.palette.grey[300]
        }}
      >
        <Container maxWidth="sm">
           <Grid container spacing={2}>
           <Grid item xs={4}>
           <Link href="https://netglobal.tech/en/home"><FacebookOutlinedIcon></FacebookOutlinedIcon></Link>
           </Grid>
           <Grid item xs={4}>
           <Link href="https://ar.linkedin.com/company/netglobal-solutions-s-a?original_referer=https%3A%2F%2Fwww.google.com%2F"><LinkedInIcon></LinkedInIcon></Link>
           </Grid>
           <Grid item xs={4}>
            <Link href="https://netglobal.tech/en/home"><TwitterIcon></TwitterIcon></Link>
           </Grid>
           </Grid>
            <Grid container spacing={2}>
                <Grid item xs={1}>
                <EmailIcon></EmailIcon> 
                </Grid>
                <Grid item xs={4}>
                <Typography>conozcanos@netglobal.tech</Typography>
                </Grid>
           </Grid>
           <Grid container spacing={2}>
               <Grid item xs={1}>
                <LocalPhoneIcon></LocalPhoneIcon>
                </Grid>
                <Grid item xs={4}>
                <Typography>(54-11) 6009-0600</Typography>
                </Grid>
          </Grid>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}