import React, { useEffect, useRef } from 'react';
import { Text, Animated,StyleSheet } from 'react-native';

const AnimateText = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
  
    useEffect(() => {
      animateText();
    }, []);
  
    const animateText = () => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      }).start();
    };
  
    return (
        <Animated.Text style={[styles.subheading, { opacity: fadeAnim }]}>
        Electronic Health Pre-Natal Passport
      </Animated.Text>
    );
  };

  const styles = StyleSheet.create({
    subheading: {
        fontSize: 18,
        marginBottom: 20,
        color: '#257180',
      },
  });
  export default AnimateText;