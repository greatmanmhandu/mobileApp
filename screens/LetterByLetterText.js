import React, { useState, useEffect } from 'react';
import { Text,StyleSheet } from 'react-native';

const LetterByLetterText = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setDisplayedText((prevText) => prevText + text[currentIndex]);
      currentIndex++;

      if (currentIndex === text.length) {
        clearInterval(interval);
      }
    }, 100); // Adjust the interval duration (in milliseconds) to control the speed of text animation

    return () => {
      clearInterval(interval);
    };
  }, [text]);

  return <Text style={styles.headerText}>{displayedText}</Text>;
};

const styles = StyleSheet.create({
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 10,
      },
  });

export default LetterByLetterText;