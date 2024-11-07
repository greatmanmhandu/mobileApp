import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,

  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
  },
  subheading: {
    fontSize: 18,
    marginBottom: 20,
    color: '#E72929',
  },
  agentheading: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  linkheading: {
    fontSize: 10,
    marginBottom: 20,
    color: 'blue',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 15, // Shadow elevation
  },
  icon: {
    marginRight: 10,
  },
  input: {
    width: '75%',
    height: 40,
    borderColor: '#257180',
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
  
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 25,
    marginTop: 30,
    marginLeft: 60,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'transparent',
    width: '100%'

    
  },

  dropdownButtonStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#257180',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginLeft:"8%",
    elevation: 15, // Shadow elevation
    
  },
  
  dropdownButtonStyle2: {
    width: '80%',
    height: 50,
    
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop:10,
    alignItems: 'center',
    paddingHorizontal: 12,
    marginLeft:"8%",
    
  },
  loginButton: {
    backgroundColor: '#E72929',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    elevation: 15, // Shadow elevation
  },
  signUpButton: {
    backgroundColor: 'transparent',
    borderColor: 'darkred',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonText2: {
    color: 'green',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 2,
    marginRight: 10,
    marginBottom: 2,
    padding: 5,
  },
  rounded: {
    borderRadius: 50, // half of width or height to make it round
  },
  footerContainer: {
    backgroundColor: '#FFF',
    elevation: 4,
    marginVertical: 2,
    width: '100%',
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 0,
    height:"9%",
    padding: 1,
  },
  footerCard: {
    padding: 16,
  },
  
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 1,
    width: '100%',
  },
  value: {
    
    fontSize: 8,
    color: 'black',
    textAlign: 'left',
    marginLeft: "10",
    marginRight: "10"
  },
  label: {
    fontSize: 8,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 1
  ,  textAlign: 'center',
  },
  valueBtm: {
    fontSize: 9,
    color: 'black',
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'center'
  
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#E72929',
    justifyContent: 'center',
    alignItems: 'center',
},

tableContainer: {
  maxHeight: "85%", // Adjust the maximum height as needed
  borderWidth: 1,
  borderColor: '#E72929',
  borderRadius: 4,
  marginBottom: 10,
},
table: {
  marginTop: 10,
  borderColor: '#E72929',
  // borderWidth: 1,
  // borderRadius: 5,
  padding: 10,
  marginBottom: 0,
  height: '85%',
  // maxHeight: "85%",
},
tableHeader: {
  fontSize: 15,
  fontWeight: 'bold',
  marginBottom: 10,
  textAlign: 'center',
},
tableRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 5,
  borderColor: '#E72929',
  borderBottomWidth: 1,
},
tableCell: {
  flex: 1,
  fontSize: 13,
  alignItems: 'center',
  fontWeight: 'bold',
},
tableCell2: {
  flex: 1,
  alignItems: 'center',
  fontSize: 12,
},
  
});

export default styles;