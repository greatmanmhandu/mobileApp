import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
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
    color: 'red',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },

  buttonContainer: {
    flexDirection: 'row',
    marginBottom:20,
  },

  startShiftButton: {
    backgroundColor: 'darkred',
    borderWidth: 15,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderColor: 'darkred',
    borderWidth: 2,
  },

  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: 300,
    height: 100,
    borderRadius: 2,
    marginRight: 10,
    marginBottom: 2,
    padding: 5,
  },

  

  dropdownButtonStyle: {
    width: '80%',
    height: 70,
    backgroundColor: '#E72929',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    elevation: 15, // Shadow elevation
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
  },
  dropdownButtonArrowStyle: {
    fontSize: 15,
  },
  dropdownButtonIconStyle: {
    fontSize: 15,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#E72929',
    justifyContent: 'center',
    alignItems: 'center',
},
section: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 10,
  width: '100%',
  paddingLeft:"10%"
},
label: {
  fontSize: 10,
  fontWeight: 'bold',
  color: 'black',
  marginBottom: 0,
  marginRight: 20,
  flex: 0.4,
  textAlign: 'left',
},
value: {
  flex: 0.6,
  fontSize: 10,
  color: 'black',
},

footerContainer: {
  backgroundColor: '#FFF',
  elevation: 4,
  marginVertical: 2,
  borderRadius: 8,
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
sectionArrow: {
  flexDirection: 'row',
  alignItems: 'center',

  width: '100%',
},
valueA: {
  flex: 0.3,
  fontSize: 8,
  textAlign: 'right',
  paddingRight: 10

},
labelA: {
  fontWeight: 'bold',
  marginBottom: 0,
  marginRight: 20,
  flex: 0.7,
  textAlign: 'left',
  color: 'white',
  fontSize: 15,
},
});

export default styles;