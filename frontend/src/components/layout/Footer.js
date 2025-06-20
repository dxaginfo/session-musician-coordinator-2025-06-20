import React from 'react';
import { Box, Container, Grid, Typography, Link, Divider } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-evenly">
          <Grid item xs={12} sm={4} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Session Musician Coordinator
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Connecting musicians with recording opportunities
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Platform
            </Typography>
            <Link href="/musicians" color="text.secondary" display="block">Find Musicians</Link>
            <Link href="/projects" color="text.secondary" display="block">Projects</Link>
            <Link href="/how-it-works" color="text.secondary" display="block">How It Works</Link>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Resources
            </Typography>
            <Link href="/help" color="text.secondary" display="block">Help Center</Link>
            <Link href="/pricing" color="text.secondary" display="block">Pricing</Link>
            <Link href="/blog" color="text.secondary" display="block">Blog</Link>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Legal
            </Typography>
            <Link href="/terms" color="text.secondary" display="block">Terms of Service</Link>
            <Link href="/privacy" color="text.secondary" display="block">Privacy Policy</Link>
            <Link href="/copyright" color="text.secondary" display="block">Copyright</Link>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Connect
            </Typography>
            <Link href="https://twitter.com" color="text.secondary" display="block" target="_blank" rel="noopener">Twitter</Link>
            <Link href="https://instagram.com" color="text.secondary" display="block" target="_blank" rel="noopener">Instagram</Link>
            <Link href="https://facebook.com" color="text.secondary" display="block" target="_blank" rel="noopener">Facebook</Link>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 6, mb: 4 }} />
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Session Musician Coordinator. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
