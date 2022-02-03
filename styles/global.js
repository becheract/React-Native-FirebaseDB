import { StyleSheet } from 'react-native'




export const global = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D8F3DC',
    alignItems: 'center',
    justifyContent: 'center',
    padding:20,
  },
  form: {
    display: 'flex',
    alignItems:'center',
  },
  reactangle: {
    display: 'flex',
    padding:20,
    flex:1,
    width: '80%',
    borderRadius:10,
    backgroundColor: '#fff',
    overflow: 'hidden'
  },
  head: {
    textAlign:'center',
    padding:30,
  },
  formLabel: {
    fontSize: 20,
    color: 'black',
    padding:20,
    textAlign:'center',
  },
  inputStyle: {
    marginTop: 20,
    width: '80%',
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 15,
    backgroundColor: '#F9F9F9',
  },
  formText: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    fontSize: 20,
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
  textmid:{
    textAlign : 'center',
  },
  button:{
    textAlign : 'center',
    backgroundColor:'#52B788',
    margin:20,
    padding:15,
    borderRadius:15,
    width: 100,
    height: 'auto',
  },
  profile: {
    width: 100,
    height: 100,
    borderRadius: 50,
  }

});