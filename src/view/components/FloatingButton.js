import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { customStyles } from '../CustomStyles';

const FloatingButton = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={customStyles.floatingButton} onPress={onPress}>
      <Text style={customStyles.floatingButtonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default FloatingButton;
