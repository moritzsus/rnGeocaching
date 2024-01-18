import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const FloatingButton = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 8,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default FloatingButton;
