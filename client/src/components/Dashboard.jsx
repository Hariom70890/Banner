import React, { useState, useEffect } from 'react';
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Switch,
  Button,
  Heading,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';

function Dashboard({ bannerData, updateBanner }) {
  const [formData, setFormData] = useState({
    isVisible: false,
    description: '',
    timer: 0,
    link: '',
  });

  useEffect(() => {
    if (bannerData) {
      setFormData(bannerData);
    }
  }, [bannerData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNumberChange = (name, value) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBanner(formData);
  };

  return (
    <VStack as="form" onSubmit={handleSubmit} spacing={4} align="stretch">
      <Heading size="lg">Banner Dashboard</Heading>
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="isVisible" mb="0">
          Banner Visible
        </FormLabel>
        <Switch
          id="isVisible"
          name="isVisible"
          isChecked={formData.isVisible}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Timer (seconds)</FormLabel>
        <NumberInput
          min={0}
          value={formData.timer}
          onChange={(value) => handleNumberChange('timer', value)}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      <FormControl>
        <FormLabel>Link</FormLabel>
        <Input
          name="link"
          value={formData.link}
          onChange={handleChange}
        />
      </FormControl>
      <Button type="submit" colorScheme="blue">
        Update Banner
      </Button>
    </VStack>
  );
}

export default Dashboard;