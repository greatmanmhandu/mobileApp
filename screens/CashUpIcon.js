import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CashUpIcon = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="cash-outline" size={20} color="white" style={styles.icon} />
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

export default CashUpIcon;