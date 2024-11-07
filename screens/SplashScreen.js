import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LetterByLetterText2 from './LetterByLetterText2';

const SplashScreen = () => {
  const splashImage = require('../assets/pregaz.jpeg');
  const gradientColors = ['#2ecc71', '#3498db', '#f1c40f']; // Green, Blue, Yellow

  return (
    <View style={styles.container}>
      <LinearGradient colors={gradientColors} style={styles.gradient}>
      {/* <View style={styles.gradient} /> */}
      <Image source={splashImage} style={[styles.image, styles.rounded]} />
      {/* <Text style={styles.text}>.... preparing to launch ....</Text> */}
      <LetterByLetterText2  text="loading" />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height:'100%',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  rounded: {
    borderRadius: 60, // half of width or height to make it round
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'white',
  },
});

export default SplashScreen;