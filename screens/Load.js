import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const Loader = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 30000); // Set the duration in milliseconds (30 seconds)

    return () => clearTimeout(timer);
  }, []);

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000,
    },
    loaderBox: {
      backgroundColor: 'white',
      padding: 16,
      borderRadius: 8,
      shadowColor: 'rgba(0, 0, 0, 0.25)',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 1,
      shadowRadius: 10,
      elevation: 5,
      zIndex: 1010,
      flexDirection: 'row',
      alignItems: 'center',
    },
    loaderText: {
      fontSize: 16,
      color: 'red',
      marginLeft: 8,
    },
  });

  if (!visible) {
    return null; // Hide the loader after 30 seconds
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.loaderBox}>
        <ActivityIndicator size="large" color="green" />
        <Text style={styles.loaderText}>loading...</Text>
      </View>
    </View>
  );
};

export default Loader;