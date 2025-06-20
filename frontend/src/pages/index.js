import React from 'react';
import { Container, Typography, Box, Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero';
import FeatureCard from '../components/home/FeatureCard';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PaymentIcon from '@mui/icons-material/Payment';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const features = [
  {
    id: 1,
    title: 'Musician Discovery',
    description: 'Find the perfect session musician for your project based on instrument, genre, and availability.',
    icon: <MusicNoteIcon fontSize="large" />
  },
  {
    id: 2,
    title: 'Scheduling System',
    description: 'Book and manage recording sessions with an integrated calendar to avoid conflicts.',
    icon: <CalendarMonthIcon fontSize="large" />
  },
  {
    id: 3,
    title: 'Secure Payments',
    description: 'Process payments securely with escrow protection for both musicians and clients.',
    icon: <PaymentIcon fontSize="large" />
  },
  {
    id: 4,
    title: 'File Sharing',
    description: 'Exchange audio files, provide feedback, and maintain version control easily.',
    icon: <CloudUploadIcon fontSize="large" />
  }
];

export default function Home() {
  return (
    <Layout>
      <Hero />
      
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h2" component="h2" textAlign="center" gutterBottom>
          Connect with the right musicians for your project
        </Typography>
        
        <Typography variant="h5" color="text.secondary" textAlign="center" paragraph sx={{ mb: 6 }}>
          Our platform makes it easy to find, schedule, and pay session musicians for your recording needs.
        </Typography>
        
        <Grid container spacing={4}>
          {features.map((feature) => (
            <Grid item key={feature.id} xs={12} sm={6} md={3}>
              <FeatureCard 
                title={feature.title} 
                description={feature.description} 
                icon={feature.icon} 
              />
            </Grid>
          ))}
        </Grid>
        
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button variant="contained" size="large" color="primary" href="/register">
            Get Started
          </Button>
        </Box>
      </Container>
    </Layout>
  );
}
