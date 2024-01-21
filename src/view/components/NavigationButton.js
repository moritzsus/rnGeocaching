import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { customStyles } from '../CustomStyles';

const NavigationButton = ({ buttonText, targetScreen }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(targetScreen);
  };

  return (
    <TouchableOpacity style={customStyles.navButton} onPress={handlePress}>
      <Text style={customStyles.navButtonText}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default NavigationButton;
