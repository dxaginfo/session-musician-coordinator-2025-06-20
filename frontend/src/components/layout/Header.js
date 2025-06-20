import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { useRouter } from 'next/router';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Find Musicians', path: '/musicians' },
  { label: 'Projects', path: '/projects' },
  { label: 'How It Works', path: '/how-it-works' }
];

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

const Header = () => {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Session Musician Coordinator
      </Typography>
      <List>
        {navItems.map((item) => (
          <Link href={item.path} key={item.label} passHref style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem button>
              <ListItemText primary={item.label} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" position="static" color="primary">
        <Container maxWidth="lg">
          <StyledToolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              Session Musician Coordinator
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
              {navItems.map((item) => (
                <Link href={item.path} key={item.label} passHref style={{ textDecoration: 'none' }}>
                  <Button 
                    sx={{ 
                      color: '#fff',
                      mx: 0.5,
                      borderBottom: router.pathname === item.path ? '2px solid #fff' : 'none'
                    }}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
              <Button color="inherit" variant="outlined" sx={{ ml: 2 }} href="/login">
                Login
              </Button>
              <Button color="secondary" variant="contained" sx={{ ml: 1 }} href="/register">
                Sign Up
              </Button>
            </Box>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </StyledToolbar>
        </Container>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 } }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Header;
