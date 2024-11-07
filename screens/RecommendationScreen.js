import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_URL from '../components/baseurl';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import DateTimeComponent from './DateTimeComponent';
import Loader from './Load';

const RecommendationScreen = () => {
    const [paymentByAgent, setPaymentByAgent] = useState([]);
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

    }
    const recommendations = [
        { id: 1, text: "Stay hydrated by drinking plenty of water." },
        { id: 2, text: "Eat a balanced diet rich in fruits and vegetables." },
        { id: 3, text: "Get regular exercise suitable for pregnant women." },
        { id: 4, text: "Take prenatal vitamins as prescribed by your doctor." },
        { id: 5, text: "Get plenty of rest and sleep." },
        { id: 6, text: "Avoid alcohol, smoking, and caffeine." },
        { id: 7, text: "Attend regular prenatal check-ups." },
        { id: 8, text: "Practice relaxation techniques like deep breathing and meditation." },
        { id: 9, text: "Avoid raw or undercooked meat and fish." },
        { id: 10, text: "Maintain good posture to reduce back pain." },
        { id: 11, text: "Stay active with prenatal yoga or swimming." },
        { id: 12, text: "Limit exposure to harmful chemicals and toxins." },
        { id: 13, text: "Keep track of your baby's movements and report any changes to your doctor." },
        { id: 14, text: "Practice pelvic floor exercises to prepare for childbirth." },
        { id: 15, text: "Avoid contact with cat feces to prevent toxoplasmosis." },
        { id: 16, text: "Eat small, frequent meals to help with nausea and heartburn." },
        { id: 17, text: "Stay active and maintain a healthy weight during pregnancy." },
        { id: 18, text: "Avoid hot tubs and saunas which can raise your body temperature too high." },
        { id: 19, text: "Communicate openly with your partner and healthcare provider about your pregnancy." },
        { id: 20, text: "Educate yourself about the stages of pregnancy and childbirth." },
        { id: 21, text: "Practice Kegel exercises to strengthen your pelvic floor muscles." },
        { id: 22, text: "Avoid certain medications that may not be safe during pregnancy." },
        { id: 23, text: "Stay informed about warning signs of complications during pregnancy." },
        { id: 24, text: "Take breaks and elevate your legs to reduce swelling in your feet and ankles." },
        { id: 25, text: "Get tested for gestational diabetes as recommended by your healthcare provider." },
        { id: 26, text: "Prepare a birth plan outlining your preferences for labor and delivery." },
        { id: 27, text: "Stay connected with other pregnant women for support and advice." },
        { id: 28, text: "Avoid changing cat litter to reduce the risk of toxoplasmosis." },
        { id: 29, text: "Learn about breastfeeding and consider taking a breastfeeding class." },
        { id: 30, text: "Practice good oral hygiene and visit the dentist for regular check-ups." },
        { id: 31, text: "Stay away from secondhand smoke to protect your baby's health." },
        { id: 32, text: "Educate yourself about common discomforts during pregnancy and how to manage them." },
        { id: 33, text: "Take childbirth education classes to prepare for labor and delivery." },
        { id: 34, text: "Stay positive and practice stress-reducing activities like yoga or mindfulness." },
        { id: 35, text: "Avoid raw sprouts which can harbor harmful bacteria." },
        { id: 36, text: "Discuss any travel plans with your healthcare provider to ensure safety during pregnancy." },
        { id: 37, text: "Plan for postpartum care and support for yourself after the baby is born." },
        { id: 38, text: "Stay aware of your mental health and seek help if you experience mood changes or depression." },
        { id: 39, text: "Avoid contact with chemicals like cleaning products that may be harmful during pregnancy." },
        { id: 40, text: "Consider taking a childbirth preparation class with your partner." },
        { id: 41, text: "Discuss your birth preferences with your healthcare provider and create a birth plan." },
        { id: 42, text: "Stay active and incorporate gentle exercises like walking or swimming into your routine." },
        { id: 43, text: "Avoid handling pet rodents or their bedding to prevent exposure to a virus called lymphocytic choriomeningitis." },
        { id: 44, text: "Stay informed about common pregnancy symptoms and when to contact your doctor." },
        { id: 45, text: "Plan for childcare arrangements and support after the baby is born." },
        { id: 46, text: "Consider taking a childbirth class to learn about the stages of labor and delivery." },
        { id: 47, text: "Learn about the benefits of skin-to-skin contact with your newborn." },
        { id: 48, text: "Eat a variety of foods to ensure you and your baby get all the necessary nutrients." },
        { id: 49, text: "Avoid high-mercury fish like shark, swordfish, king mackerel, and tilefish during pregnancy." },
        { id: 50, text: "Stay informed about signs of preterm labor and when to seek medical help." }
    ];






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
                    <Text style={styles.headerText}>Recommendations & Advice</Text>
                </View>
                <Text style={styles.subheading}>check daily recomendations</Text>

                <View style={styles.containerIcon}>
                    <TouchableOpacity onPress={handleBack}>
                        <Ionicons name="arrow-back" size={38} color="#257180" style={styles.icon2} />
                    </TouchableOpacity>
                    <View style={styles.spacer} />
                </View>

                <View style={styles.agentInfoContainer}>
                    <View >
                        <Text style={styles.recommendationTitle}>Daily Recommendations</Text>
                        <ScrollView style={styles.recommendationsList}>
                            {recommendations.map(recommendation => (
                                <TouchableOpacity key={recommendation.id} style={styles.recommendationItem}>
                                    <Text style={styles.recommendationText}>{`${recommendation.id}. ${recommendation.text}`}</Text>
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
        height: '69%',
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
        height:'94%',

    },
    recommendationItem: {
        backgroundColor: '#891652',
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

export default RecommendationScreen;