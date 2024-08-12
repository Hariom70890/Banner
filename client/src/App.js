import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, VStack, HStack, useMediaQuery } from '@chakra-ui/react';
import Banner from './components/Banner';
import Dashboard from './components/Dashboard';
import axios from 'axios';

function App() {
  const [bannerData, setBannerData] = useState(null);
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    fetchBannerData();
  }, []);

  const fetchBannerData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/banner');
      setBannerData(response.data);
    } catch (error) {
      console.error('Error fetching banner data:', error);
    }
  };

  const updateBanner = async (newData) => {
    try {
      await axios.patch('http://localhost:5000/api/banner', newData);
      fetchBannerData();
    } catch (error) {
      console.error('Error updating banner:', error);
    }
  };

  return (
    <ChakraProvider>
      <Box minHeight="100vh" bg="gray.100">
        {isLargerThan768 ? (
          <HStack spacing={0} align="stretch" height="100vh">
            <Box width="50%" p={8} bg="white">
              <Dashboard bannerData={bannerData} updateBanner={updateBanner} />
            </Box>
            <Box width="50%" p={8} bg="gray.100">
              <Banner
                isVisible={bannerData?.isVisible}
                description={bannerData?.description}
                timer={bannerData?.timer}
                link={bannerData?.link}
              />
            </Box>
          </HStack>
        ) : (
          <VStack spacing={8} p={4}>
            <Box width="100%" p={4} bg="white" borderRadius="md" boxShadow="md">
              <Dashboard bannerData={bannerData} updateBanner={updateBanner} />
            </Box>
            <Box width="100%" p={4} bg="gray.100" borderRadius="md">
              <Banner
                isVisible={bannerData?.isVisible}
                description={bannerData?.description}
                timer={bannerData?.timer}
                link={bannerData?.link}
              />
            </Box>
          </VStack>
        )}
      </Box>
    </ChakraProvider>
  );
}

export default App;