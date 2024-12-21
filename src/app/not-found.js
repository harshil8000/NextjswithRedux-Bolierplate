"use client"
import { Button, Container, Typography, Box, Paper } from '@mui/material';
import { keyframes } from '@emotion/react'; // Change this import
import NotFoundImage from '../../public/assets/404.svg'; // Adjust the path as necessary

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
`;

const Custom404 = () => {
  return (
    <Container component="main" maxWidth="lg" sx={{ textAlign: 'center', mt: 8 }}>
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: '#f9f9f9',
          borderRadius: 2,
          p: 4,
          boxShadow: 6,
          height: '100vh',
          justifyContent: 'center',
          transition: 'transform 0.3s',
          '&:hover': {
            transform: 'scale(1.02)',
          },
        }}
      >
        <Box
          component="img"
          src={NotFoundImage.src}
          alt="Not Found"
          sx={{
            width: { xs: '80%', sm: '60%', md: '300px' },
            height: 'auto',
            mb: 3,
            borderRadius: 2,
            animation: `${bounce} 2s infinite`,
          }}
        />
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
          Oops! Page Not Found
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ color: '#666', mb: 4 }}>
          Sorry, the page you are looking for does not exist. 
          You might want to check the URL or return to the homepage.
        </Typography>
        <Button
          href='/'
          variant="contained"
          color="primary"
          size="large"
          sx={{
            padding: '12px 24px',
            borderRadius: 5,
            transition: 'background-color 0.3s, transform 0.2s',
            '&:hover': {
              backgroundColor: '#1976d2',
              transform: 'scale(1.05)',
            },
          }}
        >
          Go to Homepage
        </Button>
      </Paper>
    </Container>
  );
};

export default Custom404;
