import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      paddingTop: 30,
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
      fontSize: 20,
      fontFamily: "OpenSans_500Medium"
    },
    itemCart: {
      alignItems: 'center',
      justifyContent: 'center',
      width: "100%",
      height: 140
    },
    itemName: {
      fontSize: 20,
      textAlign: 'center',
      minWidth: "70%",
      maxWidth: "78%",
      fontFamily: "OpenSans_500Medium"
    },
    actionIcons: {
      gap: 30,
      marginTop: 20,
      flexDirection: "row",
      alignItems: 'center'
    },
    iconTrash: {
      marginBottom: 5
    },
    quantItems: {
      flexDirection: "row",
      gap: 15,
      alignItems: "center",
    },
    quantityValue: {
      fontSize: 24,
      fontFamily: "OpenSans_500Medium"
    },
    bought:{
      textDecorationLine: 'line-through'
    },
    totalValue: {
      textAlign: "center",
      fontSize: 22,
      marginBottom: 10,
      fontFamily: "OpenSans_500Medium"
    },
    buttonGradient: {
      borderRadius: 100,
      width: "80%",
      marginBottom: 20,
    },
    buttonCheckout:{
      paddingVertical: 15,
      paddingHorizontal: 20,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      textAlign: "center",
    },
    textButton: {
      color: '#000',
      fontSize: 18,
      fontFamily: "OpenSans_500Medium"
    }
})

export default styles