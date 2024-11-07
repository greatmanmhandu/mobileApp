import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, TextInput, TouchableOpacity, View, ActivityIndicator, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import BASE_URL from '../components/baseurl';
import ResponseMessage from './ResponseMessage';


const RegisterScreen = ({ navigation }) => {

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userType, setUserType] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  // const truckImage = require('../assets/truck30.png');

  const handleRegister = async () => {
    console.log(BASE_URL + 'create-user')
    try {

      const response = await axios.post(BASE_URL + 'create-user', {
        firstName: firstname,
        lastName: lastname,
        username: username,
        phoneNumber: phoneNumber,
        roles: userType,
        password: password,
      });
      const responseData = response.data;
      navigation.navigate('LoginScreen');
    } catch (error) {
      setLoginMessage('Login failed. Please try again.');
    }
  };


  const handleLogin = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <ImageBackground source={require('../assets/back.jpg')} style={styles.container}>
      <View style={styles.imageHeader}>
        <Image source={truckImage} style={styles.image} />
      </View>

      <Text style={styles.subheading}>Create Your Account Here, Explore</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="person" size={24} color="white" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstname}
          onChangeText={(text) => setFirstname(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name="person" size={24} color="white" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastname}
          onChangeText={(text) => setLastname(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name="call" size={24} color="white" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name="person" size={24} color="white" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed" size={24} color="white" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <View style={styles.radioContainer}>
        <View style={styles.radioGroup}>
          <TouchableOpacity
            style={[styles.radioButton, userType === 'driver' && styles.radioButtonSelected]}
            onPress={() => setUserType('driver')}
          >
            <Text style={[styles.radioButtonText, userType === 'driver' && styles.radioButtonTextSelected]}>
              Driver ?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.radioButton, userType === 'customer' && styles.radioButtonSelected]}
            onPress={() => setUserType('customer')}
          >
            <Text style={[styles.radioButtonText, userType === 'customer' && styles.radioButtonTextSelected]}>
              Client ?
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {loginMessage !== '' && (
        <ResponseMessage message={loginMessage} setMessage={setLoginMessage} />
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.signUpButton]} onPress={handleRegister}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
    marginTop: 0,
  },
  subheading: {
    fontSize: 18,
    marginBottom: 40,
    color: 'white',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: 'transparent',
    borderColor: "darkorange",
    borderWidth: 2,
  },
  signUpButton: {
    backgroundColor: 'transparent',
    borderColor: "darkred",
    borderWidth: 2,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'row', // Set the direction to row
    justifyContent: 'space-between', // Distribute the buttons horizontally
    width: '100%',
  },
  button: {
    flex: 1, // Allow the buttons to expand and fill the available space
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 35,
    marginRight: 50,
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: 300,
    height: 150,
    borderRadius: 2,
    marginRight: 10,
    marginBottom: 2,
    padding: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 20,
  },
  radioLabel: {
    marginRight: 10,
    fontSize: 16,
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: 'white',
    marginRight: 10,
  },
  radioButtonSelected: {
    backgroundColor: 'darkred',
  },
  radioButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  radioButtonTextSelected: {
    color: 'white',
  },
});

export default RegisterScreen;