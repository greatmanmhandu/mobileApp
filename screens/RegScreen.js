import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, Image, TextInput, TouchableOpacity, View, ActivityIndicator, ImageBackground, NativeModules, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_URL from '../components/baseurl';
import ResponseMessage from './ResponseMessage';
import styles from './styles/LoginScreenStyles'; // Import the styles object
import ConnectivityChecker from './ConnectivityChecker';
import NetInfo from '@react-native-community/netinfo';
import Loader from './Load';
import AnimateText from './AnimateText';
import LetterByLetterText from './LetterByLetterText';
import { format } from 'date-fns';


const RegScreen = () => {
    const [phoneNumber, setPhoneNumber] = useState(0);
    const [password, setPassword] = useState('');
    const [conpass, setConPass] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const navigation = useNavigation();
    const [loginMessage, setLoginMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false); // New state variable
    const logo = require('../assets/pregaz.jpeg');
    const [isConnected, setIsConnected] = useState(true);
    const [currentDateTime, setCurrentDateTime] = useState("");



    useEffect(() => {

        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);

        });

        return () => {
            unsubscribe();
        };
    }, []);


    useEffect(() => {
        // Fetch the current date and time
        const fetchCurrentDateTime = () => {
            const dateTime = new Date().toISOString();
            setCurrentDateTime(dateTime);
        };

        fetchCurrentDateTime();
    }, []);

    let formattedDateTime = "";
    if (currentDateTime && typeof currentDateTime === "string") {
        formattedDateTime = currentDateTime.substring(0, 10);
    }
    const handleLogin = async () => {
        navigation.navigate('LoginScreen');
    }
    const handleRegister = async () => {
        if (username === '' && phoneNumber === '' && firstName === '' && lastName === '' && password === '') {
            setLoginMessage('Please Enter all information.');
        } else {
            if (password === conpass) {
                setIsLoading(true)
                try {
                    console.log(BASE_URL + "user/create-mobile")
                    const response = await axios.post(BASE_URL + "user/create-mobile", {
                        phoneNumber: phoneNumber,
                        password: password,
                        username: username,
                        name: firstName + " " + lastName,
                        email: username + "@gmail.com",
                        admin: false
                    });
                    const responseData = response.data;
                    setIsLoading(false);
                    navigation.navigate('LoginScreen');



                } catch (error) {
                    setIsLoading(false);
                    console.log("error on : " + error)
                    setLoginMessage('Login failed. Please try again.');
                }

            } else {
                setLoginMessage('Passwords does not match');
            }
            //
        }
    };


    return (

        <View style={styles.container}>
            {isLoading && <Loader />}
            <View style={styles.imageHeader}>
                <Image source={logo} style={[styles.image, styles.rounded]} />
            </View>
            <View style={styles.header}>
                <LetterByLetterText text=" E - H  - PN - P" />
            </View>
            <AnimateText />
            {loginMessage !== '' && (
                <ResponseMessage message={loginMessage} setMessage={setLoginMessage} />
            )}
            <View style={styles.inputContainer}>
                <Ionicons name="person" size={24} color="#257180" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Firstname"
                    value={firstName}
                    onChangeText={(text) => setFirstName(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Ionicons name="person" size={24} color="#257180" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Lastname"
                    value={lastName}
                    onChangeText={(text) => setLastName(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Ionicons name="person" size={24} color="#257180" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Ionicons name="person" size={24} color="#257180" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    value={phoneNumber}
                    keyboardType="numeric"
                    onChangeText={(text) => setPhoneNumber(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Ionicons name="lock-closed" size={24} color="#257180" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Ionicons name="lock-closed" size={24} color="#257180" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    secureTextEntry
                    value={conpass}
                    onChangeText={(text) => setConPass(text)}
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.dropdownButtonStyle} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>

            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.dropdownButtonStyle2} onPress={handleLogin}>
                    <Text style={styles.buttonText2}>Already have an account? Login!</Text>
                </TouchableOpacity>

            </View>



        </View>

    );
};


export default RegScreen;