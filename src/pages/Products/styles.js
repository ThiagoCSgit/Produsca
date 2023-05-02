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
      width: '100%',
    },
    productItem: {
      margin: 10,
      alignItems: 'center',
      flexDirection: 'row',
    },
    productInfos: {
      justifyContent: 'center'
    },
    productIcon: {
      width: 70,
      height: 70,
      marginRight: 10
    },
    productName: {
      fontSize: 18,
    },
    checkboxLabel:{
      flexDirection: 'row',
      marginLeft: 10,
      marginBottom: 15
    },
    label: {
      marginLeft: 10
    }
  });


export default styles;