import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, Image, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_URL from '../components/baseurl';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import DateTimeComponent from './DateTimeComponent';
import ConnectivityChecker from './ConnectivityChecker';
import NetInfo from '@react-native-community/netinfo';
import DottedLine from './DottedLine';
import Loader from './Load';

const UserInfoEditScreen = () => {
    const [agentInfo, setAgentInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // New state variable
    const profileImage = require('../assets/pregaz.jpeg');
    const navigation = useNavigation();
    const [isConnected, setIsConnected] = useState(true);
    const [userId, setUserId] = useState(0);
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [id, setId] = useState('');
    const [dob, setDob] = useState('');


    useEffect(() => {
        agentLoggedUserName();
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);

        });

        return () => {
            unsubscribe();
        };


    }, []);

    agentLoggedUserName = async () => {
        const user = await AsyncStorage.getItem('username');
        const userIdString = await AsyncStorage.getItem('userId');
        const userId = JSON.parse(userIdString);
        setUserId(userId);
        getData(userId);

    }

    const getData = async (uId) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}user/`+uId);

            const fetchedInfo = response.data;
            setAgentInfo(fetchedInfo);
            console.log(fetchedInfo);

            if (fetchedInfo) {
                setName(fetchedInfo.name);
                setPhoneNumber(fetchedInfo.phoneNumber);
                setAddress(fetchedInfo.address);
                setId(fetchedInfo.nationalId);
                setDob(fetchedInfo.dob);
            }
            setIsLoading(false); // Data has been fetched, set isLoading to false
            await AsyncStorage.setItem('userInfomation', JSON.stringify(response.data.data.agent));
            setIsLoading(false);


        } catch (error) {
            // console.error('Error getting agent:', error);
            setIsLoading(false);

        }
    };


   

    const handleBack = () => {
        navigation.navigate('HomeScreen');
    };

    const handleEdit = () => {

    };
    const handleUpdate = async () => {
        console.log(BASE_URL + 'update-user-details')
        try {
          
            const response = await axios.post(`${BASE_URL}update-user-details`, {
                name: name,
                phoneNumber: phoneNumber,
                idNumber: id,
                username: phoneNumber,
                address: address,
                sessionUserId:2
            });

            const responseData = response.data;
            navigation.navigate('HomeScreen');
            setIsLoading(false); // Data has been fetched, set isLoading to false
        } catch (error) {
            setIsLoading(false); // Data has been fetched, set isLoading to false
        }
    };

    return (
        <>
            {/* <View style={styles.container}> */}
            {isLoading && <Loader />}
            <View style={styles.wrapperContainer}>

                <View style={styles.imageHeader}>
                    <Image source={profileImage} style={styles.image} />
                </View>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Edit Information</Text>
                </View>
                <Text style={styles.subheading}> Make changes and update</Text>
                <View style={styles.containerIcon}>
                    <TouchableOpacity onPress={handleBack}>
                        <Ionicons name="arrow-back" size={34} color="#257180" style={styles.icon2} />
                    </TouchableOpacity>
                    <View style={styles.spacer} />
                </View>

                <View style={styles.agentInfoContainer}>
                    <View style={styles.lookupheading}>
                        <Text style={styles.premiumText}>Update your profile below</Text>
                        <Text style={styles.lookupHeading}></Text>
                    </View>
                    {agentInfo && (
                        <ScrollView style={styles.scrowContainer}>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter full name"
                                    value={name}
                                    onChangeText={(text) => setName(text)}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter date of birth (dd/mm/yyyy)"
                                    value={dob}
                                    onChangeText={(text) => setDob(text)}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter phone number"
                                    value={phoneNumber}
                                    onChangeText={(text) => setPhoneNumber(text)}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter id number"
                                    value={id}
                                    onChangeText={(text) => setId(text)}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter address"
                                    value={address}
                                    onChangeText={(text) => setAddress(text)}
                                />
                            </View>

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={[styles.dropdownButtonStyle, styles.lookupButton]} onPress={handleUpdate}>
                                    <Text style={styles.buttonText}>Save changes</Text>
                                </TouchableOpacity>

                            </View>

                        </ScrollView>


                    )}
                </View>



            </View>

        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 35,
    },
    imageHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
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
    lookupHeading: {
        fontSize: 10,
        marginBottom: 0,
        color: 'black',
        textAlign: "center",
        marginTop: 8,
        marginBottom: 8,
    },
    premiumText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 10,
        textAlign: "center"
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 75,

    },
    scrowContainer: {
        maxHeight: "98%", // Adjust the maximum height as needed
        // borderWidth: 1,
        // borderColor: '#E72929',
        borderRadius: 9,
        marginBottom: 10,
    },
    label: {
        fontSize: 13,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 5,
        marginRight: 20,
        flex: 0.4,
        textAlign: 'right',
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
        paddingHorizontal: 20,
    },
    agentInfoContainer: {
        marginTop: 10,
        width: '100%',
        height: '56%',
        backgroundColor: 'white',
        marginBottom: 10,
        borderRadius: 10,
        padding: 10,

    },

    dropdownButtonStyle: {
        width: '100%',
        height: 40,
        backgroundColor: 'white',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        width: '100%',
    },
    value: {
        flex: 0.6,
        fontSize: 13,
        color: 'black',
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

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#E72929',
        justifyContent: 'center',
        alignItems: 'center',
    },

    table: {
        marginTop: 20,
        borderColor: '#E72929',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 70,
    },
    tableHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    tableCell: {
        flex: 1,
        fontSize: 16,
        alignItems: 'center',
        fontWeight: 'bold',
    },
    tableCell2: {
        flex: 1,
        alignItems: 'center',
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',

    },
    button: {
        flex: 1,
        paddingTop: "3%",
        paddingBottom: "1%",
        borderWidth: 1,
        backgroundColor: 'transparent',
    },
    lookupButton: {
        backgroundColor: 'black',
        borderWidth: 2,
        borderRadius: 10,
        width: '100%',
        height: 50,
        marginTop: 20,

    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    footerContainer: {
        backgroundColor: '#FFF',
        elevation: 4,
        marginVertical: 0,
        // borderRadius: 8,
        width: '100%',
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 0,
        height: "7%",
    },
    footerCard: {
        padding: 16,
    },

    sectionB: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 1,
        width: '100%',
    },
    valueB: {
        flex: 0.7,
        fontSize: 8,
        color: 'black',
        textAlign: 'left',
    },
    labelB: {
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
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    inputContainer2: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#E72929',
        borderWidth: 2,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: 'white',
    },

});

export default UserInfoEditScreen;