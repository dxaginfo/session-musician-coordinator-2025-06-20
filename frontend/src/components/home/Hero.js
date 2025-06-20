import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeroBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '80vh',
  maxHeight: 700,
  display: 'flex',
  alignItems: 'center',
  backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("/images/hero-background.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: theme.palette.common.white,
}));

const Hero = () => {
  return (
    <HeroBox>
      <Container maxWidth="md">
        <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Typography
            component="h1"
            variant="h2"
            color="inherit"
            gutterBottom
          >
            Find the Perfect Session Musician
          </Typography>
          <Typography
            variant="h5"
            color="inherit"
            paragraph
            sx={{ mb: 4 }}
          >
            Connect with professional musicians for your recording projects. 
            Book sessions, exchange files, and handle payments all in one place.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' }, gap: 2 }}>
            <Button variant="contained" color="primary" size="large" href="/register">
              Get Started
            </Button>
            <Button variant="outlined" color="inherit" size="large" href="/musicians">
              Browse Musicians
            </Button>
          </Box>
        </Box>
      </Container>
    </HeroBox>
  );
};

export default Hero;
