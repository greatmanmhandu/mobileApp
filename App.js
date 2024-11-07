import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import UserInfoScreen from './screens/UserInfoScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import RecommendationScreen from './screens/RecommendationScreen';
import MedicalCenterScreen from './screens/MedicalCenterScreen';
import PretermScreen from './screens/PretermScreen';
import SinkScreen from './screens/SinkScreen';
import SplashScreen from './screens/SplashScreen';
import DeliveryInfoScreen from './screens/DeliveryInfoScreen';
import ChangePassword from './screens/ChangePassword';
import VaccinationScreen from './screens/VaccinationScreen';
import UserInfoEditScreen from './screens/UserInfoEditScreen';
import RegScreen from './screens/RegScreen';


const AppNavigator = () => {
  const Stack = createStackNavigator();
  const isLoggedIn = false; // Set the initial login state to false
  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>

        </>
      ) : (
        <>
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RegScreen"
            component={RegScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UserInfoScreen"
            component={UserInfoScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RecommendationScreen"
            component={RecommendationScreen}
            options={{ headerShown: false }}
          />


       
          <Stack.Screen
            name="MedicalCenterScreen"
            component={MedicalCenterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PretermScreen"
            component={PretermScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SinkScreen"
            component={SinkScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="DeliveryInfoScreen"
            component={DeliveryInfoScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="VaccinationScreen"
            component={VaccinationScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UserInfoEditScreen"
            component={UserInfoEditScreen}
            options={{ headerShown: false }}
          />

        </>
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 5000); // Set the duration in milliseconds
  }, []);
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          {showSplash ? (
            <SplashScreen />
          ) : (
            <AppNavigator />
          )}
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}