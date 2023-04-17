import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      padding: 20,
      height: "100%",
      width: "100%"
    },
    titleIcon: {
      flexDirection: 'row',
      alignItems: 'baseline',
      paddingBottom: 10,
    },
    titlePage: {
      marginBottom: 20,
      fontSize: 25,
      position: 'relative',
      left: 10
    },
    iconCart: {
      position: 'relative',
      left: 30
    },
    modifyPositionIcon: {
      position: 'relative',
      left: 60
    },
    listProducts:{
      flex: 1,
    },
    productItem: {
      margin: 10,
      alignItems: 'center',
      width: 100,
      height: 100
    },
    productIcon: {
      width: 70,
      height: 70
    },
    productName: {
      fontSize: 18,
      textAlign: 'center'
    }
  });


export default styles;