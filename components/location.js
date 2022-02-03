import  SearchBar  from 'react-native-platform-searchbar';
import React, {useState, useEffect} from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { global } from "../styles/global";
import { Dropdown, Menu } from 'semantic-ui-react'
//location api
import * as Location from 'expo-location';

export default function location() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={global.form}>
      <Text style={global.text}>{text}</Text>
    </View>
  );
}

