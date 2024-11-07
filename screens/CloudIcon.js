import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CloudIcon = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="person" size={20} color="#257180" style={styles.icon} />
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

export default CloudIcon;