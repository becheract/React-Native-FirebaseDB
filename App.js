import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
//screens
import LandingScreen from "../my-app/screens/Landing";

import imageScreen from "../my-app/screens/ImageSelector";
import loginScreen from "../my-app/screens/login";
import profileScreen from "../my-app/screens/profilePage"
//firebase
import { firestore, auth } from './FirebaseConfig';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen
          name="Home"
          component={LandingScreen}
          options={{ headerShown: false }}
        />


        <Stack.Screen 
        name="Login"
        component={loginScreen}
        options={{headerShown:false}}
        />

      <Stack.Screen 
        name="image"
        component={imageScreen}
        options={{headerShown:false}}
        />

      <Stack.Screen 
        name="profile"
        component={profileScreen}
        options={{headerShown:false}}
        />

    </Stack.Navigator>
    </NavigationContainer>
  );
}
