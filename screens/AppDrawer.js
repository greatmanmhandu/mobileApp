import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const NavigationDrawer = ({ navigation }) => {
  const handleDrawerPress = (item) => {
    // Handle drawer item press here
  };

  return (
    <View style={styles.drawerContainer}>
      <TouchableOpacity style={styles.drawerItem} onPress={() => handleDrawerPress('Need Help')}>
        <Text style={styles.drawerText}>Need Help</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem} onPress={() => handleDrawerPress('Settings')}>
        <Text style={styles.drawerText}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem} onPress={() => handleDrawerPress('Emergency')}>
        <Text style={styles.drawerText}>Emergency</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  drawerItem: {
    paddingVertical: 10,
  },
  drawerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default NavigationDrawer;