import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ShadowText = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4, // for Android
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 8,
  },
});

export default ShadowText;