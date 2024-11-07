import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CornerArrow = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="arrow-forward" size={25} color="white" style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  icon: {
    // Additional styles for the icon if needed
  },
});

export default CornerArrow;