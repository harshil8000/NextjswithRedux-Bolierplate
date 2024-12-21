import React from "react";
import Lottie from "react-lottie";
import { Box } from "@mui/material";

// Import your Lottie JSON file
import animationData from '../../../public/Untitled_file.json'; // Path to your Lottie JSON file

const AnimatedLoader = () => {
  // Lottie options
  const options = {
    animationData: animationData,
    loop: true,  // Set loop to true if you want the animation to repeat
    autoplay: true,  // Set autoplay to true if you want the animation to play automatically
  };

  return (
    <Box 
      sx={{
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', // Full screen height
        backgroundColor: '#fff', // Light background color
      }}
    >
      <Lottie options={options} height={400} width={400} />
    </Box>
  );
};

export default AnimatedLoader;
