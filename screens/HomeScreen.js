import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Switch, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator, Animated, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import HomeDateTimeComponent from './HomeDateTimeComponent';
import CornerArrow from './CornerArrow';
import CloudIcon from './CloudIcon';
import LogOutIcon from './LogOutIcon';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = ({ navigation }) => {
  const profileImage = require('../assets/pregaz.jpeg');
  const [menuData, setMenuData] = useState([]);
  const [isConnected, setIsConnected] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // New state variable
  const [role, setRole] = useState('');


  const handleCardPress = (item) => {
    if (item.id == 1) {
      navigation.navigate('RecommendationScreen', { item });
    } else
      if (item.id == 2) {
        navigation.navigate('UserInfoScreen', { item });
      } else
        if (item.id == 3) {
          navigation.navigate('MedicalCenterScreen', { item });
        } else
          if (item.id == 4) {
            navigation.navigate('PretermScreen', { item });
          } else
            if (item.id == 5) {
              navigation.navigate('DeliveryInfoScreen', { item });
            } else
              if (item.id == 6) {
                navigation.navigate('VaccinationScreen', { item });
              }
              else {

              }

  };

  const handlePasswordScreenButtonPress = () => {
    setIsDrawerOpen(false);
    navigation.navigate('ChangePassword');
  };


  const handleLogOut = () => {
    setIsDrawerOpen(false);
    navigation.navigate('LoginScreen');
  };



  const gradientColors = ['#850F8D', '#C738BD', '#257180']; // Green, Blue, Yellow
  const getHomeMenus = async () => {
    const roles = await AsyncStorage.getItem('role');

    setMenuData([
      { "id": 1, "label": "Recomendations & Advice", "labelB": "get recommendations and advice" },
      { "id": 2, "label": "User Information", "labelB": "view & update your profile information" },
      { "id": 3, "label": "Medical Centers", "labelB": "view all medical nearby centers" },
      { "id": 4, "label": "Report Preterm Birth", "labelB": "report on labour pains and preterm" },
      { "id": 5, "label": "Delivery Information", "labelB": "fill in delivery information here" },
      { "id": 6, "label": "Child Vaccinations", "labelB": "manage vaccination period for your child" }

    ])

  };


  useEffect(() => {
    getHomeMenus();

    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };

  }, []);

  const renderCustomerCard = ({ item }) => (
    <TouchableOpacity style={styles.cardContainer} onPress={() => handleCardPress(item)}>
      <LinearGradient colors={gradientColors} style={styles.gradient}>
        <View style={styles.card}>
          <View style={styles.wrapperContainer}>
            <View style={styles.labelWrapper}><Text style={styles.labelA}>{item.label}</Text></View>
            <View><Text style={styles.labelB}>{item.labelB}</Text></View>
          </View>

        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerOverlayOpacity = useState(new Animated.Value(0))[0];

  const handleDrawerButtonPress = () => {
    setIsDrawerOpen(true);
    Animated.timing(drawerOverlayOpacity, {
      toValue: 0.5,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(drawerOverlayOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsDrawerOpen(false));
  };

  if (isLoading) {
    return (
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.switchContainer}>
        <TouchableOpacity style={[styles.drawerNavButton]} onPress={handleDrawerButtonPress}>
          <Ionicons name="menu" size={38} color="#257180" style={{ marginLeft: 10, marginTop: 20 }} />
        </TouchableOpacity>


      </View>

      <View style={styles.containerIcon}>
        <Text style={styles.subheading}>E-Health Pre-Natal Passport</Text>

      </View>

      <FlatList
        key={true ? 'twoColumns' : 'oneColumn'}
        data={menuData}
        renderItem={renderCustomerCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        numColumns={true ? 2 : 1}
      />

      {isDrawerOpen && (
        <View style={[styles.drawerContainer, styles.overlay]}>
          <View style={styles.overlayArea}>
            <Image source={profileImage} style={styles.image2} />
            <TouchableOpacity style={styles.closeButtonDrawer} onPress={closeDrawer}>
              <Ionicons name="close" size={32} color="#257180" styles={{ marginTop: 5, marginRight: 10 }} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.drawerButtons} >
              <Text style={styles.drawerButtonText2} onPress={handlePasswordScreenButtonPress}>Change Password</Text><CloudIcon />
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerButtons2} onPress={handleLogOut}>
              <Text style={styles.drawerButtonText2}>Log Out</Text><LogOutIcon />
            </TouchableOpacity>

          </View>

        </View>

      )}
      {isDrawerOpen && (
        <Animated.View style={[styles.overlay, { opacity: drawerOverlayOpacity }]} />
      )}

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',


  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F9FD',
    justifyContent: 'center',
    height: 70,


  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
  },
  subheading: {
    fontSize: 18,
    marginBottom: 0,
    paddingLeft: 19,
    fontWeight: 'bold',
    color: 'black',
  },
  drawerButton: {
    position: 'absolute',
    top: 20,
    left: 0,
    zIndex: 1,
    padding: 2,
  },
  drawerNavButton: {
    position: 'absolute',
    top: 1,
    left: 0,
    zIndex: 1,
    padding: 2,
  },
  iconMenu: {
    marginLeft: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 1,
    marginTop: 28,
    color: 'white',
    alignSelf: 'center',
  },
  listContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: "25%",

  },
  cardContainer: {
    flex: 1,
    margin: 10,
  },
  card: {
    marginBottom: "2%",
    width: '100%',
    aspectRatio: 1.3,
    borderRadius: 10,
    overflow: "hidden",
  },
  gradient: {
    padding: 5,
    marginBottom: '2%',
    borderRadius: 10,
    width: '100%',
  },
  scrowContainer: {
    maxHeight: "85%", // Adjust the maximum height as needed
  },
  imageContainer: {
    alignItems: 'flex-start',
    marginBottom: 0,
  },
  wrapperContainer: {
    flexDirection: 'column',
    marginTop: "8%",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    marginBottom: 2,
  },
  image2: {
    width: 100,
    height: 100,
    borderRadius: 2,
    marginRight: 10,
    marginBottom: 0,
    marginTop: 15,
    padding: 10,
  },

  fromLocationContainer: {
    marginLeft: 0,
  },
  toLocationContainer: {
    marginLeft: 0,
  },
  subDetailsContainer: {
    marginTop: 10,
  },
  itemDetails: {
    marginBottom: 0,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 8,
  },
  toLocation: {
    marginBottom: 0,
    fontSize: 11,
  },
  amount: {
    marginTop: 0,
    fontWeight: 'bold',
    fontSize: 13,
  },
  description: {
    marginTop: 0,
    fontWeight: 'bold',
    fontSize: 11,
  },
  time: {
    color: 'gray',
    fontSize: 8,
  },
  distance: {
    color: 'red',
    fontSize: 12,
  },
  tone: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 8,
  },
  drawerContainer: {
    position: 'absolute',
    width: '98%', // Set the width to occupy 50% of the screen
    height: '86%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    zIndex: 999, // Ensure the overlay appears on top of other elements
  },
  overlayArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',

    // position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    marginTop: 74,
    marginLeft: 2,
    marginRight: 10,
    borderRadius: 10,
    width: '98%', // Set the width to occupy 50% of the screen
    height: '68%',
    // backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  acceptButton: {
    backgroundColor: 'green',
  },
  rejectButton: {
    backgroundColor: 'darkred',
  },
  drawerButtons: {
    backgroundColor: 'white',
    borderColor: '#257180',
    borderTopWidth: 2,
    width: '100%',
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  drawerButtons2: {
    backgroundColor: 'white',
    borderColor: '#257180',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    width: '100%',
    height: 60,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  closeButtonDrawer: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
    padding: 1,
  },
  drawerImage: {
    width: 100,
    height: 100,
    borderRadius: 75,
    marginBottom: 80,
  },

  drawerButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  drawerButtonText2: {
    color: 'black',
    fontSize: 10,
    fontWeight: 'bold',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent black overlay

  },

  modalContainer: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'gray',
    padding: 20,
    borderRadius: 5,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'green',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    flex: 1,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'transparent',
  },

  footerContainer: {
    backgroundColor: '#FFF',
    elevation: 9, // Shadow elevation
    marginVertical: 1,
    // borderRadius: 8,
    height: "5%",
    width: "100%",
    marginTop: 10,
    alignSelf: 'flex-end', // Align to the bottom
  },
  footerCard: {
    // padding: 8,
  },

  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    width: '100%',
  },
  value: {
    flex: 0.6,
    fontSize: 8,
    color: 'black',
    marginTop: 5
  },
  label: {
    fontSize: 8,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 20,
    flex: 0.4,
    textAlign: 'right',
    marginTop: 5
  },
  containerIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: "#E8F9FD",//#E8F9FD
    height: 40,
    paddingBottom: 2,
    marginBottom: 2,
  },
  icon2: {
    marginHorizontal: 15,
    backgroundColor: '#E8F9FD',
    width: 40,
    height: 40,
  },
  icon: {
    marginHorizontal: 10,
  },
  spacer: {
    flex: 1,
  },

  sectionArrow: {
    // flexDirection: 'row',
    // alignItems: 'center',

    // width: '100%',
    flexDirection: "row",
    alignItems: "center",
  },
  valueA: {
    flex: 0.3,
    fontSize: 8,
    textAlign: 'right',
    paddingRight: 10,


  },
  labelA: {
    fontWeight: 'bold',
    marginRight: 20,
    textAlign: 'center',
    color: 'white',
    paddingLeft: 20,
    fontSize: 13,
  },
  labelB: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginTop: -8,
    fontSize: 10,
  },
  labelWrapper: {
    height: 70,
  },
});

export default HomeScreen;