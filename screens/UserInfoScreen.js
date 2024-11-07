import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
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

const UserInfoScreen = () => {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false); // New state variable
    const profileImage = require('../assets/pregaz.jpeg');
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [isConnected, setIsConnected] = useState(true);
    const [id, setId] = useState(0);


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
        setUsername(user)
        setId(userId);
        getData(userId);

    }

    const getData = async (userId) => {
        setIsLoading(true);
        try {
            const response = await axios.get(BASE_URL+ "user/"+userId);
            setData(response.data);
            setIsLoading(false); 


        } catch (error) {
            console.error('Error getting :', error);
            setIsLoading(false);

        }
    };




    const handleBack = () => {
        navigation.navigate('HomeScreen');
    };

    const handleEdit = () => {
        navigation.navigate('UserInfoEditScreen');
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
                    <Text style={styles.headerText}>Information</Text>
                </View>
                <Text style={styles.subheading}> my personal information</Text>
                <View style={styles.containerIcon}>
                    <TouchableOpacity onPress={handleBack}>
                        <Ionicons name="arrow-back" size={34} color="#257180" style={styles.icon2} />
                    </TouchableOpacity>
                    <View style={styles.spacer} />
                    {/* <DateTimeComponent /> */}
                    <TouchableOpacity onPress={handleEdit}>
                        <Ionicons name="create" size={34} color="white" style={styles.icon} />
                    </TouchableOpacity>
                </View>
             
                    <View style={styles.agentInfoContainer}>
                    {data && (
                        <ScrollView style={styles.scrowContainer}>

                            <View style={styles.section}>
                                <Text style={styles.label}>Full Name:</Text>
                                <Text style={styles.value}>{data.name}</Text>
                            </View>
                            <View style={styles.section}>
                                <Text style={styles.label}>Username:</Text>
                                <Text style={styles.value}>{data.username}</Text>
                            </View>
                            <View style={styles.section}>
                                <Text style={styles.label}>Phone Number:</Text>
                                <Text style={styles.value}>{data.phoneNumber}</Text>
                            </View>
                            <DottedLine />
                            <View style={styles.section}>
                                <Text style={styles.label}>Email:</Text>
                                <Text style={styles.value}>{data.email}</Text>
                            </View>
                            <View style={styles.section}>
                                <Text style={styles.label}>Gender:</Text>
                                <Text style={styles.value}>female</Text>
                            </View>
                            <DottedLine />

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
        marginTop: 40,
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
    image: {
        width: 100,
        height: 100,
        borderRadius: 75,

    },
    scrowContainer: {
        maxHeight: "95%", // Adjust the maximum height as needed
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
        marginBottom: 6,
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
        marginTop: 40,
        borderRadius: 10,
        padding: 10,
        paddingTop:90

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
        width: 38,
        height: 38,
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

});

export default UserInfoScreen;