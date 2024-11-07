import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_URL from '../components/baseurl';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import DateTimeComponent from './DateTimeComponent';
import Loader from './Load';

const MedicalCenterScreen = () => {
    const [centers, setCenters] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // New state variable
    const profileImage = require('../assets/pregaz.jpeg');
    const navigation = useNavigation();
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        agentLoggedUserName();

    }, []);

    agentLoggedUserName = async () => {
        const phoneNumber = await AsyncStorage.getItem('phoneNumber');
        const sbu = await AsyncStorage.getItem('sbu');
        const lastName = await AsyncStorage.getItem('lastName');
        const firstName = await AsyncStorage.getItem('firstName');
        setPhoneNumber(phoneNumber);
        getData();

    }
    const getData = async () => {

        try {
            const response = await axios.get(`${BASE_URL}center`);
            setCenters(response.data);
            setIsLoading(false)


        } catch (error) {
            console.error('Error getting data:', error);

        }
    };





    const handleBack = () => {
        navigation.navigate('HomeScreen');
    };

    return (
        <View style={styles.container}>
            <View style={styles.wrapperContainer}>
                {isLoading && <Loader />}
                <View style={styles.imageHeader}>
                    <Image source={profileImage} style={styles.image} />
                </View>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Matenity Medical Centres</Text>
                </View>
                <Text style={styles.subheading}>recommended for me</Text>

                <View style={styles.containerIcon}>
                    <TouchableOpacity onPress={handleBack}>
                        <Ionicons name="arrow-back" size={38} color="#257180" style={styles.icon2} />
                    </TouchableOpacity>
                    <View style={styles.spacer} />
                </View>

                <View style={styles.agentInfoContainer}>
                    <View >
                        <ScrollView style={styles.recommendationsList}>
                            {centers.map(recommendation => (
                                <TouchableOpacity key={recommendation.id} style={styles.recommendationItem}>
                                    <Text style={styles.recommendationText}>{recommendation.name}</Text>
                                    <Text style={styles.recommendationText}>{recommendation.address}</Text>
                                    <Text style={styles.recommendationText}>{recommendation.city}</Text>
                                    <Text style={styles.recommendationText}>{recommendation.phoneNumber}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                </View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',

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
    },
    subheading: {
        fontSize: 16,
        marginBottom: 0,
        color: 'white',
    },

    image: {
        width: 100,
        height: 100,
        borderRadius: 75,

    },
    label: {
        fontSize: 8,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 0,
        marginRight: 20,
        flex: 0.4,
        textAlign: 'left',
    },
    value: {
        flex: 0.6,
        fontSize: 8,
        color: 'black',
        fontWeight: 'bold',
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
        marginTop: 1,
        width: '100%',
        height: '63%',
        backgroundColor: 'white',
        marginBottom: 10,
        borderRadius: 10,
        padding: 8,

    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 1,
        width: '100%',
    },
    sectionContainer: {
        maxHeight: "20%", // Adjust the maximum height as needed
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 4,
        marginBottom: 1,
        padding: 5,
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
    tableContainer: {
        maxHeight: "85%", // Adjust the maximum height as needed
        borderWidth: 1,
        borderColor: '#257180',
        borderRadius: 4,
        marginBottom: 10,
    },

    recommendationTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    recommendationsList: {
        marginTop: 10,
    },
    recommendationItem: {
        backgroundColor: '#4C0033',
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
    },
    recommendationText: {
        color: '#fff',
        fontSize: 16,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#E72929',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MedicalCenterScreen;