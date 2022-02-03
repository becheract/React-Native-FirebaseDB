//React itself
import React, { useState } from "react";
//react-native components
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";

//css file
import { global } from "../styles/global";


//firebase
import { firestore, auth } from '../FirebaseConfig';

//importing image url and camera func
import  ImageSelector  from '../screens/ImageSelector';

//landing page 
export default function Landing({navigation}){
//use state for firebase
//register 
const [registrationName, setRegistrationName] = useState('');
const [registrationEmail, setRegistrationEmail] = useState('');
const [registrationPassword, setRegistrationPassword] = useState('');
//login
//will display the name 
const [loginName, setLoginName] = useState('');
const [loginEmail, setLoginEmail] = useState('');
const [loginPassword, setLoginPassword] = useState('');

const [selectedImage, setSelectedImage] = useState();

const [loggedIn, setLoggedIn] = useState(false);
const [databaseData, setDatabaseData] = useState('');

//registration function
const registerWithFirebase = () => {
  
  //name if length is smaller than 4
  if (registrationName.length < 4) {
    Alert.alert('Please enter a name.');
    return;
  }
  //email if length is smaller than 4
  if (registrationEmail.length < 4) {
    Alert.alert('Please enter an email address.');
    return;
  }
  //password if length is smaller than 4
  if (registrationPassword.length < 4) {
    Alert.alert('Please enter a password.');
    return;
  }


  auth.createUserWithEmailAndPassword( registrationEmail, registrationPassword)
    .then(function (_firebaseUser) {
      Alert.alert('user registered!');
      saveDataWithFirebase()
      //set it back to null
      setRegistrationEmail("");
      setRegistrationPassword("");
      setRegistrationName("");
      navigation.navigate('image');
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      
      //if errorcode = weak password
      if (errorCode == 'auth/weak-password') {
        Alert.alert('The password is too weak.');
      }
      else {
        Alert.alert(errorMessage);
      }

      console.log(error);
    }
    );


}

const loginWithFirebase = () => {

  if (loginEmail.length < 4) {
    Alert.alert('Please enter an email address.');
    return;
  }

  if (loginPassword.length < 4) {
    Alert.alert('Please enter a password.');
    return;
  }

  auth.signInWithEmailAndPassword(loginEmail, loginPassword)
    .then(function (_firebaseUser) {
      Alert.alert('user logged in!');
      setLoggedIn(true);

      // load data
      retrieveDataFromFirebase();
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      if (errorCode === 'auth/wrong-password') {
        Alert.alert('Wrong password.');
      }
      else {
        Alert.alert(errorMessage);
      }
    }
    );
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
      name: registrationName,
      photoURI: "photoURL",
    },
    {
      merge: true // set with merge set to true to make sure we don't blow away existing data we didnt intend to
    }
  )
    .then(function () {
      Alert.alert('Document successfully written!');
    })
    .catch(function (error) {
      Alert.alert('Error writing document');
      console.log('Error writing document: ', error);
    });
}

function retrieveDataFromFirebase() {
  // *********************************************************************
  // When loading data, you can either fetch the data once like in these examples 
  // -- https://firebase.google.com/docs/firestore/query-data/get-data
  // or you can listen to the collection and whenever it is updated on the server
  // it can be handled automatically by your code
  // -- https://firebase.google.com/docs/firestore/query-data/listen
  // *********************************************************************

  var userId = auth.currentUser.uid;



  /*****************************/
  // LOAD DATA FROM FIRESTORE
  /*****************************/

  // read once from data store
  // firestore.collection("users").doc(userId).get()
  //   .then(function (doc) {
  //     if (doc.exists) {
  //       setDatabaseData(doc.data().text);
  //       console.log("Document data:", doc.data());
  //     } else {
  //       // doc.data() will be undefined in this case
  //       console.log("No such document!");
  //     }
  //   })
  //   .catch(function (error) {
  //     console.log("Error getting document:", error);
  //   });

  // For real-time updates:
  firestore.collection("users").doc(userId).onSnapshot(function (doc) {
    setDatabaseData(doc.data().text);
    console.log("Document data:", doc.data());
  });

}



  return (
      <View style={global.container}>

        <View style ={global.reactangle}>
          <Text style={global.head}>Sign up Page</Text>

     
              <View style={global.form}>
     
              <TextInput
            style={global.inputStyle}
            onChangeText={ (value) => setRegistrationName(value) }
            value={registrationName}
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType="name"
            keyboardType="name"
            placeholder="name"
            />


            <TextInput
            style={global.inputStyle}
            onChangeText={ (value) => setRegistrationEmail(value) }
            value={registrationEmail}
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType="email"
            keyboardType="email-address"
            placeholder="email"
            />
  
          <TextInput
              style={global.inputStyle}
              onChangeText={ (value) => setRegistrationPassword(value) }
              value={registrationPassword}
              autoCapitalize="none"
              autoCorrect={false}
              autoCompleteType="password"
              keyboardType="visible-password"
              placeholder="password"
            />
                  <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <TouchableOpacity style={global.button} onPress={() => registerWithFirebase()}>
                      <Text style={global.text}>Sign Up</Text>
                    </TouchableOpacity>

                    <Text style={global.textmid}>OR</Text>

                    <TouchableOpacity style={global.button} onPress={() => navigation.navigate('Login')}>
                      <Text style={global.text}>Log in</Text>
                    </TouchableOpacity>
                  </View>
              </View>
            </View>
       </View>
  );
}
