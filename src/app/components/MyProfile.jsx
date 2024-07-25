// src/components/MyProfile.jsx
import React from 'react';
import { Box, Heading, Text, VStack } from "@chakra-ui/react";

const MyProfile = () => {
  return (
    <Box bg="gray.900" minHeight="100vh" color="white" p={8}>
      <VStack spacing={4} align="start">
        <Heading as="h1" size="xl">My Profile</Heading>
        <Text fontSize="lg">Welcome to your profile page!</Text>
        {/* Add more profile-related information and functionalities here */}
      </VStack>
    </Box>
  );
};

export default MyProfile;
