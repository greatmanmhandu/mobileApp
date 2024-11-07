import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, Image, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_URL from '../components/baseurl';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ProgressBarAndroid } from 'react-native';
import ConnectivityChecker from './ConnectivityChecker';
import NetInfo from '@react-native-community/netinfo';

const SinkScreen = () => {
    const [isLoading, setIsLoading] = useState(false); // New state variable
    const profileImage = require('../assets/icon.png');
    const navigation = useNavigation();
    const [helpText, setHelpText] = useState('');
    const [progress, setProgress] = useState(0.5); // Set the initial progress value

    const formattedPercentage = Math.floor(progress * 100) + '%';
    const [isConnected, setIsConnected] = useState(true);
    const [agentNumber, setAgentNumber] = useState('');
    const [sbu, setSbu] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastname] = useState('');
    const [paymentByAgent, setPaymentByAgent] = useState([]);

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
        const agentNumber = await AsyncStorage.getItem('agentNumber');
        const sbu = await AsyncStorage.getItem('sbu');
        const lastName = await AsyncStorage.getItem('lastName');
        const firstName = await AsyncStorage.getItem('firstName');
        setAgentNumber(agentNumber);
        setSbu(sbu);
        setLastname(lastName);
        setFirstName(firstName)
        console.log("saved: " + agentNumber);
        const payments = await getFailedPayments(agentNumber);
        setPaymentByAgent(payments);

    }
    const getFailedPayments = async (agentNumber) => {
        try {
          const failedPaymentsJSON = await AsyncStorage.getItem('failedPayments');
          const failedPayments = JSON.parse(failedPaymentsJSON);
      
          const filteredPayments = failedPayments.filter(
            (payment) => payment.agentNumber === agentNumber
          );
      
          // console.log('Failed payments retrieved successfully:', filteredPayments);
          return filteredPayments;
        } catch (error) {
          console.log('Failed to retrieve failed payments:', error);
          return [];
        }
      };

    const handleBack = () => {
        navigation.navigate('HomeScreen');
    };

    const handleCloseShiftButton = () => {

    };


    return (
        <>
            {isLoading && <Loader />}
            <View style={styles.container}>
        
                <View style={styles.wrapperContainer}>
                    <View style={styles.imageHeader}>
                        <Image source={profileImage} style={styles.image} />
                    </View>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Sync Transactions</Text>
                    </View>
                    <Text style={styles.subheading}>Sync all your transactions to the server</Text>

                    <View style={styles.containerIcon}>
                        <TouchableOpacity onPress={handleBack}>
                            <Ionicons name="arrow-back" size={34} color="#E72929" style={styles.icon2} />
                        </TouchableOpacity>
                        <View style={styles.spacer} />
                        {/* <TouchableOpacity onPress={handleEdit}>
                        <Ionicons name="create" size={40} color="white" style={styles.icon} />
                    </TouchableOpacity> */}
                    </View>
          
                        <View style={styles.agentInfoContainer}>

                            <View>
                                <Text style={styles.preheading}>Please click the button below to push all transactions to the server.</Text>
                                <View style={styles.inputContainer}>
                                    <ProgressBarAndroid
                                        styleAttr="Horizontal"
                                        indeterminate={false}
                                        progress={progress}
                                        color="red"
                                        style={styles.progressBar}
                                    />
                                    <Text style={styles.percentage}>{formattedPercentage}</Text>
                                </View>


                                <View style={styles.inputContainer}>
                                    <View style={styles.buttonContainer}>
                                        <TouchableOpacity
                                            style={[styles.button, styles.lookupButton]}
                                            onPress={handleCloseShiftButton}
                                        >
                                            <Text style={styles.buttonText}>Sync To Server</Text>
                                        </TouchableOpacity>
                                    </View>
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
        marginTop: 35,
    },
    imageHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        marginBottom: 3,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 0,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 10,
    },
    subheading: {
        fontSize: 18,
        marginBottom: 0,
        color: 'white',
    },
    preheading: {
        fontSize: 18,
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
    },
    lookupButton: {
        backgroundColor: 'black',
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
        width: 130,
        height: 130,
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
        height: "90%",
        backgroundColor: '#E72929',
        marginBottom: 0,
        marginLeft: 12,
        marginRight: 5,
        marginTop: 1,
        borderRadius: 10,
        paddingHorizontal: 20,
    },
    agentInfoContainer: {
        marginTop: 1,
        width: '100%',
        height: '55%',
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
    progressBar: {
        width: '80%',
        height: 20, // Increase the height of the progress bar
        marginVertical: 10,
    },
    percentage: {
        fontSize: 20, // Increase the font size of the percentage
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
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#E72929',
        justifyContent: 'center',
        alignItems: 'center',
    },

});

export default SinkScreen;