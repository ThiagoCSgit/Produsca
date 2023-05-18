import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      paddingTop: 40,
      height: "100%",
      width: "100%"
    },
    emptyCartImage:{
        width: 300,
        height: 300,
    },
    labelEmptyCart: {
      textAlign: 'center',
      marginTop: 20,
      fontSize: 20
    },
    itemCart: {
      flexDirection: "row",
      alignItems: 'center',
      justifyContent: 'center',
      width: "100%"
    },
    itemName: {
      fontSize: 19,
      textAlign: 'center',
      minWidth: "70%",
      maxWidth: "78%",
      borderWidth: 1,
      borderColor: "red"
    },
    actionIcons: {
      gap: 15,
      marginLeft: 15,
      flexDirection: "row"
    },
    bought:{
      textDecorationLine: 'line-through'
    }
})

export default styles