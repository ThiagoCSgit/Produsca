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
      alignItems: 'center',
      justifyContent: 'center',
      width: "100%",
      height: 140
    },
    itemName: {
      fontSize: 22,
      textAlign: 'center',
      minWidth: "70%",
      maxWidth: "78%",
    },
    actionIcons: {
      gap: 30,
      marginTop: 20,
      flexDirection: "row",
      alignItems: 'center'
    },
    quantItems: {
      flexDirection: "row",
      gap: 15
    },
    quantityValue: {
      fontSize: 24
    },
    bought:{
      textDecorationLine: 'line-through'
    }
})

export default styles