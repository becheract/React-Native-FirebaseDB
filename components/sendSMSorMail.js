import  SearchBar  from 'react-native-platform-searchbar';
import React, {useState, useEffect} from "react";
import { View, Text, TextInput, TouchableOpacity, Alert,Button } from "react-native";
import { global } from "../styles/global";
import { Dropdown, Menu } from 'semantic-ui-react'

import * as MailComposer from 'expo-mail-composer';
import * as SMS from 'expo-sms';

import { firestore, auth } from '../FirebaseConfig';

export default function Notify(){
    var userId = auth.currentUser.uid;

    
    const isAvailable  =  SMS.isAvailableAsync();
    const options ={
        recipients: ['some_user@gmail.com'],
        ccRecipients: ['some_other_user@gmail.com'],
        bccRecipients: ['some_other_user@yahoo.com'],
        subject: 'My Subject Line',
        body: 'some message',
        isHtml: false
    }

    const sendMessageWithSMS = async () => {
   
        const isAvailable = await SMS.isAvailableAsync();
        if (isAvailable) {
          
          const { result } = await SMS.sendSMSAsync(
            ['3213213214', '1231231234'],
            "Message!"
          );
         
        } else {
          
        }
        
    
      }

      

    const createThreeButtonAlert = () =>
    Alert.alert('SMS or Mail', 'Choose an option', [
      {
        text: 'SMS',
        onPress: () => sendMessageWithSMS()
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },

      ]);


    return(
     <View style={global.form}>
         <Text> Get Location </Text>
        <Button style={global.button} title={'2-Button Alert'} onPress={createThreeButtonAlert} />
     </View>
    );
}