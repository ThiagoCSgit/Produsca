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
      paddingBottom: 10
    },
    titlePage: {
      marginBottom: 20,
      marginHorizontal: 10,
      fontSize: 25,
    },
    iconCamera: {
      width: 50,
      height: 50,
      borderWidth: 2,
      borderRadius: 100,
      padding: 10,
      marginBottom: 5,
      justifyContent: 'center',
      alignItems: 'center'
    },
    listSupermarkets:{
      flex: 1,
      width: '100%',
    },
    supermarketItem: {
      margin: 15,
      alignItems: 'center',
      width: '100%',
      flexDirection: 'row'
    },
    supermarketIcon: {
      width: 70,
      height: 70,
      marginRight: 10
    },
    supermarketName: {
      fontSize: 18,
      textAlign: 'left'
    }
  });


export default styles;