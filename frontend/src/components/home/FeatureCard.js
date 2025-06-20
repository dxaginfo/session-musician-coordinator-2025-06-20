import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main
}));

const FeatureCard = ({ title, description, icon }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 } }}>
      <CardContent>
        <IconWrapper>
          {icon}
        </IconWrapper>
        <Typography gutterBottom variant="h5" component="h3" align="center">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
