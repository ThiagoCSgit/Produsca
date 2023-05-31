import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      height: "100%",
      width: "100%"
    },
    emptyCartImage:{
        width: 300,
        height: 300,
    },
    screenList:{
      width: "100%", 
      height: "100%",
      alignItems: 'center'
    },
    labelEmptyCart: {
      textAlign: 'center',
      marginTop: 20,
      fontSize: 20
    },
    itemCart: {
      alignItems: 'center',
      justifyContent: 'center',
      width: "100%",
      flexDirection: 'row',
      minHeight: 100
    },
    itemName: {
      fontSize: 22,
      textAlign: 'center',
      minWidth: "70%",
      width: "80%",
    },
    buttonSimulate:{
      width: "80%",
      height: 50,
      borderRadius: 100,
      padding: 10,
      marginBottom: 5,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: '#1E90FF',
      textAlign: 'center',
      marginBottom: 20
    },
    iconCalculator:{
      marginRight: 20,
      color: '#fff'
    },
    textButton: {
      color: '#fff',
      fontSize: 18
    },
})

export default styles