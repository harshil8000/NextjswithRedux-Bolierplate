"use client";
import React from "react";
import { Box, Container, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import { keyframes } from "@mui/system"; // For animations
import HomeIcon from "@mui/icons-material/Home";
import ShortcutIcon from "@mui/icons-material/Shortcut";
interface Props {
  name?: string; // Renamed to title for clarity
  routeName?: string; // Route name to display
}

// Keyframes for the animation
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Banner: React.FC<Props> = ({
  name = "Welcome to Criticalkare",
  routeName = "",
}) => {
  const router = useRouter(); // Initialize useRouter hook

  const handleBackClick = () => {
    router.back(); // Navigate to the previous page
  };
  const handleHomeClick = () => {
    router.push("/"); // Navigate to the home page
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f5f2fc", // Clean white background
        paddingTop: "10px",
        paddingBottom: "10px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Soft shadow for depth
        borderRadius: "8px", // Rounded corners
        animation: `${fadeIn} 1s ease-in-out`, // Apply fade-in animation
        border: "1px solid #f5f2fc", // Subtle border for definition
      }}
    >
      <Container>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <IconButton
            onClick={handleBackClick} // Set onClick event handler
            sx={{
              color: "#003366", // Dark blue for icon
              "&:hover": {
                color: "#004d99", // Change color on hover
                transform: "scale(1.1)", // Slight zoom on hover
              },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "24px", sm: "32px", md: "36px", lg: "40px" },
              color: "#003366", // Dark blue for text
              fontWeight: "bold",
              textAlign: "center", // Center align the title
              flexGrow: 1, // Allow title to take remaining space
              lineHeight: 1.2, // Improve readability
              margin: 0,
            }}
          >
            {name}
          </Typography>
        </Box>
        {routeName && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mt={2}
            sx={{
              fontSize: { xs: "14px", sm: "16px" },
              color: "#004d99", // Medium blue for text
              fontWeight: "500", // Slightly lighter font weight for text
            }}
          >
            {" "}
            <IconButton
              onClick={handleHomeClick} // Set onClick event handler
              sx={{
                color: "#003366", // Dark blue for icon
                "&:hover": {
                  color: "#004d99", // Change color on hover
                  transform: "scale(1.1)", // Slight zoom on hover
                },
              }}
            >
              <ShortcutIcon />
            </IconButton>
            <Typography variant="body1">{routeName}</Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Banner;
