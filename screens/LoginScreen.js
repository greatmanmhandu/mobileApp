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


const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const [loginMessage, setLoginMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false); // New state variable
    const logo = require('../assets/pregaz.jpeg');
    const [isConnected, setIsConnected] = useState(true);
    const [isAgentSavedLocal, setIsAgentSavedLocal] = useState(false);
    const [isCurrentDateEqual, setIsCurrentDateEqual] = useState(false);
    const [isLoginTypeChanged, setIsLoginTypeChanged] = useState(false); // New state variable
    const [currentDateTime, setCurrentDateTime] = useState("");
    const [isUserSaved, setIsUserSaved] = useState(false); // New state variable



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
    const handleRegister = async () => {
        navigation.navigate('RegScreen');
    }
    const handleLogin = async () => {
        if (password === '' && username === '') {
            setLoginMessage('Please Enter Username And Password.');
        } else {
            setIsLoading(true)
            console.log(BASE_URL + "user/login-mobile")
            try {
                console.log(BASE_URL + "user/login-mobile/")
                const response = await axios.post(BASE_URL + "user/login-mobile", {
                    password: password,
                    email: username,
                });
                const responseData = response.data;
                console.log(responseData)
                await AsyncStorage.setItem('userId', JSON.stringify(responseData.userId));
                await AsyncStorage.setItem('username', responseData.username);
                setPassword("");
                setUsername("");
                setIsLoading(false);
                navigation.navigate('HomeScreen');



            } catch (error) {
                setIsLoading(false);
                console.log("error on : " + error)
                setLoginMessage('Login failed. Please try again.');
            }

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
                    placeholder="Username"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
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

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.dropdownButtonStyle} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Authenticate</Text>
                </TouchableOpacity>

            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.dropdownButtonStyle2} onPress={handleRegister}>
                    <Text style={styles.buttonText2}>Don't have an account? Register!</Text>
                </TouchableOpacity>

            </View>



            <View style={styles.footerContainer}>
                <View style={styles.footerCard}>

                </View>
            </View>


        </View>

    );
};


export default LoginScreen;