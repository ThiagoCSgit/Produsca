import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      padding: 20,
      height: "100%",
      width: "100%"
    },
    iconCamera: {
      width: 50,
      height: 50,
      borderWidth: 2,
      borderRadius: 100,
      padding: 10,
      marginBottom: 5,
      justifyContent: "center",
      alignItems: "center"
    },
    listSupermarkets:{
      flex: 1,
      width: "100%",
    },
    supermarketItem: {
      margin: 15,
      alignItems: "center",
      width: "100%",
      flexDirection: "row"
    },
    supermarketIcon: {
      width: 70,
      height: 70,
      marginRight: 10
    },
    supermarketName: {
      fontSize: 18,
      textAlign: "left",
      fontFamily: "OpenSans_500Medium"
    },
    buttonRange: {
      // height: 50,
      borderRadius: 100,
      paddingVertical: 12,
      paddingHorizontal: 20,
      marginBottom: 5,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: '#1E90FF',
    },
    iconGPS: {
      color: "#fff",
      marginRight: 10
    },
    textButtonRange: {
      color: "#fff",
      fontSize: 18,
      fontFamily: "OpenSans_500Medium"
    },
    containerModal: {
      justifyContent: "center",
      alignItems: "center",
      margin: 20,
      backgroundColor: '#fff',
      height: 200,
      position: "relative",
      top: Dimensions.get("window").height / 3,
      borderRadius: 12,
      shadowColor: "#000",
      shadowOffset: {width: 5, height: 5},
      shadowOpacity: 1,
      shadowRadius: 5,
      elevation: 20
    },
    rangeLabel: {
      fontSize: 20,
      fontFamily: "OpenSans_500Medium",
      textAlign: "center"
    },
    closeButton: {
      position: "absolute",
      top: 12,
      right: 10,
    }
  });


export default styles;