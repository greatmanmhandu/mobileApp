import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, FlatList, Image, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_URL from '../components/baseurl';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ConnectivityChecker from './ConnectivityChecker';
import NetInfo from '@react-native-community/netinfo';
import { Button, List, Text } from 'react-native-paper';
import { Bluetooth } from 'expo';
import { Permissions } from 'expo';
import Loader from './Load';

const PrinterScreen = () => {
    const [isLoading, setIsLoading] = useState(false); // New state variable
    const profileImage = require('../assets/icon.png');
    const navigation = useNavigation();
    const [isConnected, setIsConnected] = useState(true);
    const [agentNumber, setAgentNumber] = useState('');
    const [sbu, setSbu] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastname] = useState('');
    const [devices, setDevices] = useState([]);
    const [manager, setManager] = useState(null);

    useEffect(() => {
        agentLoggedUserName();
        // requestBluetoothPermission();
        // const unsubscribe = NetInfo.addEventListener(state => {
        //     setIsConnected(state.isConnected);

        // });

        // return () => {
        //     unsubscribe();
        // };

    }, []);


    agentLoggedUserName = async () => {
        const agentNumber = await AsyncStorage.getItem('agentNumber');
        const sbu = await AsyncStorage.getItem('sbu');
        const lastName = await AsyncStorage.getItem('lastName');
        const firstName = await AsyncStorage.getItem('firstName');
        setAgentNumber(agentNumber);
        setSbu(sbu);
        setLastname(lastName);
        setFirstName(firstName)
        // console.log("saved: " + agentNumber);

    }

    const requestBluetoothPermission = async () => {
        // console.log('Bluetooth permission ................');
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        // console.log('Bluetooth permission ...............22222.');
        if (status === 'granted') {
            // console.log('Bluetooth permission granted');
            // Proceed with scanning and connecting to devices
        } else {
            // console.log('Bluetooth permission denied');
            // Handle permission denial
        }
    };


    const scanAndRetrieveDevices = async () => {
        try {
            const devices = await Bluetooth.getConnectedDevicesAsync();
            devices.forEach(device => {
                // console.log('Connected device:', device.name);
            });
        } catch (error) {
            // console.log('Error scanning devices:', error);
        }
    };


    const handleBack = () => {
        navigation.navigate('HomeScreen');

    };

    const handleCloseShiftButton = () => {

    };


    const renderDeviceItem = ({ item }) => (
        <List.Item
            title={item.name || 'Unknown Device'}
            description={item.id}
            onPress={() => connectToDevice(item)}
        />
    );
    return (
        <>
          {isLoading && <Loader />}
          
                <View style={styles.wrapperContainer}>
                    <View style={styles.imageHeader}>
                        <Image source={profileImage} style={styles.image} />
                    </View>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Connect To Printer</Text>
                    </View>
                    <Text style={styles.subheading}>Turn On Bluetooth To Scan Available Printers</Text>

                    <View style={styles.containerIcon}>
                        <TouchableOpacity onPress={handleBack}>
                            <Ionicons name="arrow-back" size={34} color="#E72929" style={styles.icon2} />
                        </TouchableOpacity>
                        <View style={styles.spacer} />
                    </View>
                    <View style={styles.agentInfoContainer}>

                        <View>
                            <Text style={styles.preheading}>Avalibale Devices</Text>
                            <FlatList
                                data={devices}
                                renderItem={renderDeviceItem}
                                keyExtractor={(item) => item.id}
                                ListEmptyComponent={
                                    <Text style={styles.emptyText}>1. Connected to LocalPrintService</Text>
                                }
                            />
                            {/* <Button mode="contained" onPress={scanAndRetrieveDevices}>
                                Scan Devices
                            </Button> */}


                            <View style={styles.inputContainer}>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        style={[styles.button, styles.lookupButton]}

                                    >
                                        <Text style={styles.buttonText}>Scan Other Printers</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>



                </View>

   
            <View style={styles.footerContainer}>
                <View style={styles.footerCard}>
                    <View style={styles.section}>
                        <Text style={styles.label}>Internet Connection Status:</Text>
                        <Text style={styles.value}><ConnectivityChecker /></Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.valueBtm}>We value your trust in our cash collection services, contact our support team for any assistance.</Text>
                    </View>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
    preheading: {
        fontSize: 15,
        marginBottom: 0,
        color: 'black',
        textAlign: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: "20%",
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    button: {
        flex: 1,
        paddingTop: "4%",
        borderWidth: 1,
        backgroundColor: 'transparent',
    },
    lookupButton: {
        backgroundColor: 'black',
        borderWidth: 2,
        borderRadius: 10,
        width: '100%',
        height: 60,
        elevation: 30
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
        height: "92%",
        backgroundColor: '#E72929',
        marginBottom: 0,
        paddingHorizontal: 20,
    },
    agentInfoContainer: {
        marginTop: 1,
        width: '100%',
        height: '50%',
        backgroundColor: 'white',
        marginBottom: 10,
        borderRadius: 10,
        paddingTop: "10%",
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
        borderColor: "#E72929",
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





    footerContainer: {
        backgroundColor: '#FFF',
        elevation: 4,
        marginVertical: 2,
        borderRadius: 8,
        width: '100%',
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 0,
        height: "7%",
        // padding: 16,
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
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#E72929',
        justifyContent: 'center',
        alignItems: 'center',
    },

    emptyText: {
        textAlign: 'center',
        marginTop: 16,
        color:'green'
    },

});


export default PrinterScreen;