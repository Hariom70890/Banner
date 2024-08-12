import React, { useState, useEffect } from 'react';
import { Box, Text, Link, VStack, Progress } from '@chakra-ui/react';

function Banner({ isVisible, description, timer, link }) {
  const [timeLeft, setTimeLeft] = useState(timer);

  useEffect(() => {
    setTimeLeft(timer);
  }, [timer]);

  useEffect(() => {
    if (isVisible && timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft, isVisible]);

  if (!isVisible || timeLeft === 0) return null;

  return (
    <Box
      bg="blue.500"
      color="white"
      p={4}
      borderRadius="md"
      boxShadow="md"
    >
      <VStack spacing={2} align="stretch">
        <Text fontSize="xl" fontWeight="bold">
          {description}
        </Text>
        <Progress value={(timeLeft / timer) * 100} size="sm" colorScheme="blue" />
        <Text fontSize="sm">
          Time left: {timeLeft} seconds
        </Text>
        {link && (
          <Link href={link} color="blue.100" fontWeight="bold">
            Learn More
          </Link>
        )}
      </VStack>
    </Box>
  );
}

export default Banner;