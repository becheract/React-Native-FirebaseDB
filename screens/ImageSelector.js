import React, { useState, createContext } from 'react';
import { Text, View, Button, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { global } from "../styles/global";
import { Camera } from 'expo-camera';

//firebase
import { firestore, auth } from '../FirebaseConfig';


export default function ImageSelector ({navigation}){
//usestate to change the picture 

const [selectedImage, setSelectedImage] = useState();

console.log("running camera function");
const verifyPermissions = async () => {
    //checks if it has camera and lib perms
    const cameraResult = await ImagePicker.requestCameraPermissionsAsync();
    const libraryResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    //if not granted
    if(cameraResult.status !== 'granted' && libraryResult.status !== 'granted') {
        Alert.alert('Insufficient Permissions!', 'You need to grant camera permissions to use this app.', [{ text: 'Okay' }]);
        return false;
    }
    return true;
}

//alerts user
const alertfunction = () => {
    Alert.alert(
        'Select the option below',
        "Either Retrieve a photo or Take one",
        [{
            //take photo
            text: "Take a photo",
            onPress: () => takeImageHandler(),
        },
        {
            //retrieve from lib
            text:"Retrieve a photo",
            onPress: () => retrieveImageHandler(),
        }])
}

const retrieveImageHandler = async () => {
    //check perms
    const hasPermission = await verifyPermissions();
    //if it doesn't have perms
    if(!hasPermission) {
        return false;
    }
    //create new var that keeps the data
    const image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5
    });
    //set image to new image path
    setSelectedImage(image.uri);
    if (!image.cancelled) {
        return false;
    }
}

const takeImageHandler = async () => {
    //check if it has perms
    const hasPermission = await verifyPermissions();
    //if doesn't have perms
    if(!hasPermission) {
        return false;
    }
    //image
    const image = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5
    });
    setSelectedImage(image.uri);

    if (!image.cancelled) {
        return false;
    }
}

function saveDataWithFirebase() {
    // *********************************************************************
    // When saving data, to create a new collection you can use SET 
    // and when updating you can use UPDATE (refer to docs for more info)
    // -- https://firebase.google.com/docs/firestore/manage-data/add-data
    // *********************************************************************
  
    var userId = auth.currentUser.uid;
  
   
    
    // SAVE DATA TO FIRESTORE
    firestore.collection('users').doc(userId).set(
      {
        photoURI: selectedImage,
      },
      {
        merge: true // set with merge set to true to make sure we don't blow away existing data we didnt intend to
      }
    )
      .then(function () {
        Alert.alert('Document successfully written!');
        navigation.navigate('profile');
      })
      .catch(function (error) {
        Alert.alert('Error writing document');
        console.log('Error writing document: ', error);
      });
  }


return(
    <View style={global.container}>
    <View style ={global.reactangle}>
        <Text style={global.head}> Upload Profile Picture </Text>
    <View style={global.form}>
    {!selectedImage &&
    <TouchableOpacity onPress={alertfunction}>
    <Image source={require('../assets/placeholder.png')}  style={global.profile}  />
    </TouchableOpacity>
    }
    {selectedImage && 
    <View style={global.form}>
    <TouchableOpacity onPress={alertfunction}>
    <Image source={{uri : selectedImage }}  style={global.profile}/>
    
    </TouchableOpacity>

    <Button onPress={saveDataWithFirebase()} title="upload picture"> </Button>
    </View>
    }
    </View>
    </View>
    </View>
);
};

export { ImageSelector }
