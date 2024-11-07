import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, Image, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_URL from '../components/baseurl';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ConnectivityChecker from './ConnectivityChecker';
import NetInfo from '@react-native-community/netinfo';
import ResponseMessage from './ResponseMessage';
import Loader from './Load';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SelectDropdown from 'react-native-select-dropdown'

const PretermScreen = () => {
    const [isLoading, setIsLoading] = useState(false); // New state variable
    const profileImage = require('../assets/pregaz.jpeg');
    const navigation = useNavigation();
    const [helpText, setHelpText] = useState('');
    const [isConnected, setIsConnected] = useState(true);
    const [agentNumber, setAgentNumber] = useState('');
    const [sbu, setSbu] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastname] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [pregAge, setPregAge] = useState(0);
    const [selectedPregCount, setSelectedPregCount] = useState('');
    const [selectedDeliveryType, setSelectedDeliveryType] = useState('');
    const [selectedComplications, setSelectedComplications] = useState('');
    const [otherInfor, setOtherInfor] = useState('');

    useEffect(() => {
        agentLoggedUserName();

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

    }

    const pregCount = [
        { title: 'First', icon: 'weather-sunny' },
        { title: 'Second', icon: 'lifebuoy' },
        { title: 'Third', icon: 'weather-sunny' },
        { title: 'Fourth', icon: 'lifebuoy' },
        { title: 'Fifth', icon: 'weather-sunny' },
        { title: 'Sixth', icon: 'lifebuoy' },

    ];
    const deliveryType = [
        { title: 'C - Section', icon: 'weather-sunny' },
        { title: 'Normal Delivery', icon: 'lifebuoy' },
    ];
    const complications = [
        { title: 'Yes', icon: 'weather-sunny' },
        { title: 'No', icon: 'lifebuoy' },
    ];

    
    const handleDeliveryButton = async () => {

        try {

            const response = await axios.post(BASE_URL + 'preterm', {
                complications: selectedComplications,
                deliveryType: selectedDeliveryType,
                pregCount: selectedPregCount,
                pregAge: pregAge,
                otherInfor: otherInfor,
                userId: 2,
            });
            const responseData = response.data;

            setIsLoading(false); // Data has been fetched, set isLoading to false
        } catch (error) {
           console.log(error)
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
            <View style={styles.wrapperContainer}>
                <View style={styles.imageHeader}>
                    <Image source={profileImage} style={styles.image} />
                </View>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Pre-Term pregnancy</Text>
                </View>
                <Text style={styles.subheading}>Give details of the pre-term pregnancy</Text>

                <View style={styles.containerIcon}>
                    <TouchableOpacity onPress={handleBack}>
                        <Ionicons name="arrow-back" size={34} color="#257180" style={styles.icon2} />
                    </TouchableOpacity>
                    <View style={styles.spacer} />
                </View>

                <View style={styles.agentInfoContainer}>

                    <View>

                        <View style={styles.inputSelectContainer}>

                            <SelectDropdown
                                data={pregCount}
                                onSelect={(selectedItem, index) => {
                                    setSelectedPregCount(selectedItem.title);
                                }}
                                renderButton={(selectedItem, isOpened) => {
                                    return (
                                        <View style={styles.dropdownButtonStyle}>
                                            {selectedItem && (
                                                <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
                                            )}
                                            <Text style={styles.dropdownButtonTxtStyle}>
                                                {(selectedItem && selectedItem.title) || 'How many pregnancies have you experienced so far?'}
                                            </Text>
                                            <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                                        </View>
                                    );
                                }}
                                renderItem={(item, index, isSelected) => {
                                    return (
                                        <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                                            <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
                                            <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                                        </View>
                                    );
                                }}
                                showsVerticalScrollIndicator={false}
                                dropdownStyle={styles.dropdownMenuStyle}
                            />


                        </View>
                        <View style={styles.inputSelectContainer}>

                            <SelectDropdown
                                data={complications}
                                onSelect={(selectedItem, index) => {
                                    setSelectedDeliveryType(selectedItem.title);
                                }}
                                renderButton={(selectedItem, isOpened) => {
                                    return (
                                        <View style={styles.dropdownButtonStyle}>
                                            {selectedItem && (
                                                <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
                                            )}
                                            <Text style={styles.dropdownButtonTxtStyle}>
                                                {(selectedItem && selectedItem.title) || 'What was your delivery method?'}
                                            </Text>
                                            <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                                        </View>
                                    );
                                }}
                                renderItem={(item, index, isSelected) => {
                                    return (
                                        <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                                            <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
                                            <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                                        </View>
                                    );
                                }}
                                showsVerticalScrollIndicator={false}
                                dropdownStyle={styles.dropdownMenuStyle}
                            />


                        </View>
       
                        <View style={styles.inputSelectContainer}>

                            <SelectDropdown
                                data={deliveryType}
                                onSelect={(selectedItem, index) => {
                                    setSelectedComplications(selectedItem.title);
                                }}
                                renderButton={(selectedItem, isOpened) => {
                                    return (
                                        <View style={styles.dropdownButtonStyle}>
                                            {selectedItem && (
                                                <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
                                            )}
                                            <Text style={styles.dropdownButtonTxtStyle}>
                                                {(selectedItem && selectedItem.title) || 'Have you experienced any complications during your pregnancies?'}
                                            </Text>
                                            <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                                        </View>
                                    );
                                }}
                                renderItem={(item, index, isSelected) => {
                                    return (
                                        <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                                            <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
                                            <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                                        </View>
                                    );
                                }}
                                showsVerticalScrollIndicator={false}
                                dropdownStyle={styles.dropdownMenuStyle}
                            />


                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="How old was your pregnance ? ( number in weeks )"
                                value={pregAge}
                                onChangeText={(text) => setPregAge(text)}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={[styles.input, styles.textArea]} // Add additional styles for the text area
                                placeholder="Do you have any other questions or information you would like to share with us?, type here ..."
                                multiline={true} // Set multiline prop to true
                                value={helpText}
                                onChangeText={(text) => setHelpText(text)}
                            />
                        </View>


                        <View style={styles.inputContainer}>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={[styles.button, styles.msgButton]}
                                    onPress={handleDeliveryButton}
                                >
                                    <Text style={styles.buttonText}>Update pre-term pregnancy</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {errorMessage !== '' && (
                            <ResponseMessage message={errorMessage} setMessage={setErrorMessage} />
                        )}
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
        // marginTop: 35,
    },
    imageHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 35,
        marginBottom: 3,
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
    },
    msgButton: {
        backgroundColor: '#257180',
        borderRadius: 10,
        width: '100%',
        height: 60,
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
        paddingHorizontal: 20,
    },
    agentInfoContainer: {
        width: '100%',
        height: '55%',
        backgroundColor: 'white',
        marginBottom: 10,
        borderRadius: 10,
        padding: 8,

    },
    inputSelectContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#257180',
        borderWidth: 2,
        borderRadius: 5,

        marginBottom: 10,
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
        elevation: 15, // Shadow elevation
    },
    dropdownButtonIconStyle: {
        fontSize: 23,
        marginRight: 8,
        color: '#257180'
    },
    dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 12,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownItemIconStyle: {
        fontSize: 22,
        marginRight: 8,
        color: '#257180',
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 12,
        fontWeight: '500',
        color: 'black',
        // textAlign: 'center',
    },
    dropdownButtonArrowStyle: {
        fontSize: 28,
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
    input: {
        width: '100%',
        height: 45,
        borderColor: '#257180',
        borderWidth: 2,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: 'white',
      },
    textArea: {
        height: 100, // Set the desired height of the text area
        width: "100%",
        textAlignVertical: 'top',
        borderWidth: 1,
        borderColor: "#257180",
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
});

export default PretermScreen;