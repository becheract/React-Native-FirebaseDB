import React, { useState, createContext } from 'react';
import { Text, View, Button, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { global } from "../styles/global";
import { Camera } from 'expo-camera';
//import location
import LocationCOMP from "../components/location";
//import sms and mail
import Notify from "../components/sendSMSorMail";
//firebase
import { firestore, auth } from '../FirebaseConfig';
// battery
import Battery from '../components/battery';
export default function profilePage({navigation}){
    const [name, setName] = useState('')
    const [selectedImage, setSelectedImage] = useState();
    const [databaseData, setDatabaseData] = useState('');

        // *********************************************************************
        // When loading data, you can either fetch the data once like in these examples 
        // -- https://firebase.google.com/docs/firestore/query-data/get-data
        // or you can listen to the collection and whenever it is updated on the server
        // it can be handled automatically by your code
        // -- https://firebase.google.com/docs/firestore/query-data/listen
        // *********************************************************************
      
        var userId = auth.currentUser.uid;
        console.log('now in profile page');
        
        
        
        /*****************************/
        // LOAD DATA FROM FIRESTORE
        /*****************************/
      
        // read once from data store
        firestore.collection("users").doc(userId).onSnapshot(function (doc) {
            setDatabaseData(doc.data().text);
            setName(doc.data().name)
            setSelectedImage(doc.data().photoURI);
          });


          const signoutWithFirebase = () => {
            auth.signOut().then(function () {
              // if logout was successful
            Alert.alert('User Signed Out!')
            navigation.navigate('Home');
            });
          }
    return(
        <View style={global.container}>
        <View style ={global.reactangle}>
            <View style={global.form}>
            <Text style={global.head}> {name}'s Profile </Text>
            <Image source={{uri : selectedImage }}  style={global.profile}/>
        
        <Battery>
        </Battery>


        <LocationCOMP> 

        </LocationCOMP>

        <Notify>

        </Notify>

        <TouchableOpacity style={global.button} onPress={signoutWithFirebase}>
         <Text style={global.text}>Sign Out</Text>
         </TouchableOpacity>
        </View>
        </View>
        </View>
    
    );
}