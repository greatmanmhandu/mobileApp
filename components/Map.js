//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import MapView from 'react-native-maps';

// create a component
const Map = () => {
    return (
        <MapView
        style={tw`flex-1`}
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        />
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default Map;
