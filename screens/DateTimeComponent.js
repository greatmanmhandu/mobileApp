import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DateTimeComponent = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formattedDateTime = currentDateTime.toLocaleString();

  return (
    <View style={styles.container}>
      <Text style={styles.dateTimeText}>{formattedDateTime}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateTimeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color:"white"
  },
});

export default DateTimeComponent;