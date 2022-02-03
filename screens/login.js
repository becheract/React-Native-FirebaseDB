//React itself
import React, { useState, useEffect } from "react";
//react-native components
import { View, Text, TextInput, TouchableOpacity, Alert, } from "react-native";

//css file
import { global } from "../styles/global";
//profile picture
import ImageSelector from "../screens/ImageSelector";
//firebase
import { firestore, auth } from '../FirebaseConfig';

//landing page 
export default function login({navigation}){
//use state for firebase
//register 
let [registrationName, setRegistrationName] = useState('');
let [registrationEmail, setRegistrationEmail] = useState('');
let [registrationPassword, setRegistrationPassword] = useState('');
//login
//will display the name 
let [loginName, setLoginName] = useState('');
let [loginEmail, setLoginEmail] = useState('');
let [loginPassword, setLoginPassword] = useState('');

let [loggedIn, setLoggedIn] = useState(false);
let [databaseData, setDatabaseData] = useState('');

//login function

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

       navigation.navigate('profile');
    
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

const signoutWithFirebase = () => {
  auth.signOut().then(function () {
    // if logout was successful
    if (!auth.currentUser) {
      Alert.alert('user was logged out!');
      setLoggedIn(false);
    }
  });
}

function saveDataWithFirebase() {
  // *********************************************************************
  // When saving data, to create a new collection you can use SET 
  // and when updating you can use UPDATE (refer to docs for more info)
  // -- https://firebase.google.com/docs/firestore/manage-data/add-data
  // *********************************************************************

  //grab user id
  var userId = auth.currentUser.uid;



  // SAVE DATA TO FIRESTORE
  firestore.collection('users').doc(userId).set(
    {
      text: databaseData,
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
  // LOAD DATA FROM REALTIME DB
  /*****************************/

  // read once from data store
  // db.ref('/users/' + userId).once('value').then(function (snapshot) {
  //   setDatabaseData(snapshot.val().text);
  // });

  /*****************************/
  // LOAD DATA FROM FIRESTORE
  /*****************************/

  // read once from data store
  firestore.collection("users").doc(userId).get()
    .then(function (doc) {
      if (doc.exists) {
        setDatabaseData(doc.data().text);
        console.log("Document data:", doc.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
    });

  // For real-time updates:
//   firestore.collection("users").doc(userId).onSnapshot(function (doc) {
//     setDatabaseData(doc.data().text);
//     console.log("Document data:", doc.data());
//   });

}



  return (
      <View style={global.container}>

        <View style ={global.reactangle}>
          <Text style={global.head}>Login Page</Text>

     
              <View style={global.form}>

            <TextInput
            style={global.inputStyle}
            onChangeText={ (value) => setLoginEmail(value) }
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType="email"
            keyboardType="email-address"
            placeholder="email"
            />
  
          <TextInput
              style={global.inputStyle}
              onChangeText={ (value) => setLoginPassword(value) }
              autoCapitalize="none"
              autoCorrect={false}
              autoCompleteType="password"
              keyboardType="visible-password"
              placeholder="password"
            />
                  <View>
                  <TouchableOpacity style={global.button} onPress={() => loginWithFirebase()}>
                      <Text style={global.text}>Log in</Text>
                    </TouchableOpacity>

                    <Text style={global.textmid}>OR</Text>

                    <TouchableOpacity style={global.button} onPress={() => navigation.goBack()}>
                      <Text style={global.text}>Go Back</Text>
                    </TouchableOpacity>
                  </View>
              </View>
            </View>

       </View>
       
  );
}
