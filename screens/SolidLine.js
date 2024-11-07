import React from 'react';
import { View, StyleSheet } from 'react-native';

const SolidLine = () => (
  <View style={styles.container}>
    <View style={styles.line} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  line: {
    width: '100%',
    borderBottomColor: 'red',
    borderBottomWidth: 1,
    borderStyle: 'solid', // Change borderStyle to 'solid'
  },
});

export default SolidLine;