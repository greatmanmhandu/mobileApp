import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, Image, View, TouchableOpacity, ScrollView, Modal, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_URL from '../components/baseurl';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ConnectivityChecker from './ConnectivityChecker';
import NetInfo from '@react-native-community/netinfo';
import ResponseMessage from './ResponseMessage';
import Loader from './Load';
import { MaterialIcons } from '@expo/vector-icons';

const ChangePassword = () => {
    const [isLoading, setIsLoading] = useState(false); // New state variable
    const profileImage = require('../assets/pregaz.jpeg');
    const navigation = useNavigation();
    const [isConnected, setIsConnected] = useState(true);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [sbu, setSbu] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastname] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [password, setPassword] = useState('');
    const [newpassword, setnewPassword] = useState('');
    const [conpassword, setconPassword] = useState('');
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [isChecked, setChecked] = useState(false);
    const [errorMessageModal, setErrorMessageModal] = useState('');

    const toggleCheckbox = () => {
        setChecked(!isChecked);
        togglePopup();
    };
    const togglePopup = () => {
        setPopupVisible(!isPopupVisible);
    };

    useEffect(() => {
        agentLoggedUserName();

    }, []);


    agentLoggedUserName = async () => {
        const phoneNumber = await AsyncStorage.getItem('phoneNumber');
        const lastName = await AsyncStorage.getItem('lastName');
        const firstName = await AsyncStorage.getItem('firstName');
        setPhoneNumber(phoneNumber);
        setSbu(sbu);
        setLastname(lastName);
        setFirstName(firstName)

    }

    const handleChangePassword = async () => {
        const savedPassword = await AsyncStorage.getItem('password');
        if (newpassword===''&& conpassword) {
            setErrorMessage('fields cannot be empty');
            return;
        }
        if (password !== savedPassword) {
            setErrorMessage('Old password do not match');
            return;
        }
        if (newpassword !== conpassword) {
            setErrorMessage('New password and confirm password do not match');
            return;
        }
        updatePassword();
        togglePopup()
        setPassword('');
        setnewPassword('');
        setconPassword('');

        // Display a success message or perform any additional actions
        setErrorMessage("Password changed successfully");
    };


    const updatePassword = async () => {
            setIsLoading(true)
            try {

                const response = await axios.post(BASE_URL + 'update-password', {
                    phoneNumber: phoneNumber,
                    username:phoneNumber,
                    password: newpassword,
                });
                const responseData = response.data;
                setIsLoading(false); // Data has been fetched, set isLoading to false
                setErrorMessage('Your update has been successfully made.');
                await AsyncStorage.setItem('password', newpassword);
                navigation.navigate('LoginScreen');
            } catch (error) {
                setErrorMessage('Error updating password.');
                setIsLoading(false); 
            }
    
    };

    const handleBack = () => {
        navigation.navigate('HomeScreen');
    };
    if (isLoading) {
        return (
            <View style={styles.overlay}>
                <ActivityIndicator size="large" color="green" />
            </View>
        );
    }
    return (
        <>
        {isLoading && <Loader />}
            <View style={styles.container}>
                
                <View style={styles.wrapperContainer}>
                    <View style={styles.imageHeader}>
                        <Image source={profileImage} style={styles.image} />
                    </View>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Change Password</Text>
                    </View>
                    <Text style={styles.subheading}>Secure Your Account with a New Password</Text>

                    <View style={styles.containerIcon}>
                        <TouchableOpacity onPress={handleBack}>
                            <Ionicons name="arrow-back" size={38} color="#257180" style={styles.icon2} />
                        </TouchableOpacity>
                        <View style={styles.spacer} />
                    </View>

                    <View style={styles.agentInfoContainer}>

                        <View>
                            <View style={styles.inputContainer}>
                                <Ionicons name="lock-closed" size={24} color="#257180" style={styles.icon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Old Password"
                                    secureTextEntry
                                    value={password}
                                    onChangeText={(text) => setPassword(text)}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Ionicons name="lock-closed" size={24} color="#257180" style={styles.icon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter New Password"
                                    secureTextEntry
                                    value={newpassword}
                                    onChangeText={(text) => setnewPassword(text)}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Ionicons name="lock-closed" size={24} color="#257180" style={styles.icon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Confirm New Password"
                                    secureTextEntry
                                    value={conpassword}
                                    onChangeText={(text) => setconPassword(text)}
                                />
                            </View>
                            {errorMessage !== '' && (
                                <ResponseMessage message={errorMessage} setMessage={setErrorMessage} />
                            )}


                            <View style={styles.inputContainer}>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        style={[styles.button, styles.msgButton]}
                                        onPress={handleChangePassword}
                                    >
                                        <Text style={styles.buttonText}>Update Password</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>


                        </View>

                        <Modal visible={isPopupVisible} animationType="slide" transparent={true}>
                            <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>

                                    <Text style={styles.modalheaderText}>Confirm Note.</Text>
                                    <Text style={styles.modalTestContent}>Confirm you want to change password for {firstName} {lastName} phone number : {phoneNumber} </Text>
                                    <TouchableOpacity style={styles.checkboxContainer} onPress={toggleCheckbox}>
                                        {isChecked ? (
                                            <MaterialIcons name="check-box" size={24} color="green" />
                                        ) : (
                                            <MaterialIcons name="check-box-outline-blank" size={22} color="#257180" />
                                        )}
                                        <Text style={styles.modalTestContent2}>i consent change</Text>
                                    </TouchableOpacity>
                                    {errorMessageModal !== '' && (
                                        <ResponseMessage message={errorMessageModal} setMessage={setErrorMessageModal} />
                                    )}




                                </View>
                            </View>
                        </Modal>
                    </View>


                </View>

            </View>
           
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E72929',
    },
    imageHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 0,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 10,
    },
    subheading: {
        fontSize: 16,
        marginBottom: 0,
        color: 'white',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: "5%",
        
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    button: {
        flex: 1,
        paddingTop: "4%",
        marginLeft:'10%',
    },
    msgButton: {
        backgroundColor: 'black',
        width: '100%',
        height: 50,
        elevation: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 75,

    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 5,
        width: '90%',
        height: '16%',
    },
    modalTestContent: {
        fontSize: 11,
        marginTop: 4,
        color: 'black',
    },
    modalTestContent2: {
        fontSize: 11,
        marginBottom: 2,
        color: 'black',
    },
    modalheaderText: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: "left",
        color: 'black',
    },
    label: {
        fontSize: 13,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 0,
        marginRight: 20,
        flex: 0.4,
        textAlign: 'left',
    },
    value: {
        flex: 0.6,
        fontSize: 13,
        color: 'black',
    },
    subheading: {
        fontSize: 14,
        marginBottom: 10,
        color: 'white',
        textAlign: 'center',
    },
    wrapperContainer: {
        alignItems: 'center',
        height: "100%",
        backgroundColor: '#257180',
        marginBottom: 0,
        // marginLeft: 10,
        // marginRight: 10,
        marginTop: 1,
        borderRadius: 10,
        paddingHorizontal: 20,
    },
    agentInfoContainer: {
        marginTop: 1,
        width: '100%',
        height: '45%',
        backgroundColor: 'white',
        marginBottom: 10,
        borderRadius: 10,
        paddingTop: "15%",
        padding: 10,

    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        width: '100%',
    },

    scrollViewContent: {
        flexGrow: 1,
        paddingVertical: 16,
        paddingHorizontal: 20,
    },
    containerIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    icon2: {
        marginHorizontal: 10,
        backgroundColor: 'white',
        borderColor: "#257180",
        borderWidth: 1,
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    icon: {
        marginHorizontal: 10,
    },
    spacer: {
        flex: 1,
    },
    textArea: {
        height: 200, // Set the desired height of the text area
        width: "100%",
        textAlignVertical: 'top',
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 10,
        padding: 20

    },
    footerContainer: {
        backgroundColor: '#FFF',
        elevation: 4,
        marginVertical: 1,
        // borderRadius: 8,
        width: '100%',
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 0,
        height: "9%",
        padding: 16,
    },
    footerCard: {
        padding: 16,
    },

    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 1,
        width: '100%',
    },
    value: {
        flex: 0.7,
        fontSize: 8,
        color: 'black',
        textAlign: 'left',
    },
    label: {
        fontSize: 8,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 1,
        marginRight: 20,
        flex: 0.4,
        textAlign: 'right',
    },
    valueBtm: {
        fontSize: 7,
        color: 'black',
        fontWeight: 'bold',
    },

    icon: {
        marginRight: 10,
    },
    input: {
        width: '90%',
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        paddingHorizontal: 10,
        backgroundColor: 'white',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#E72929',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ChangePassword;