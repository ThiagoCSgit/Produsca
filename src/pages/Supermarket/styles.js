import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      padding: 15,
      height: "100%",
      width: "100%"
    },
    supermarketInfos: {
      gap: 15
    },
    supermarketName: {
      fontSize: 30,
      textAlign: 'center',
      fontFamily: "OpenSans_500Medium"
    },
    supermarketInfo: {
      fontSize: 21,
      textAlign: 'center',
      fontFamily: "OpenSans_500Medium"
    },
    buttonCall:{
      // height: 30, 
      width: 50, 
      marginLeft: 20,
      marginTop: 5
    },
    listSupermarketCategorys:{
      flex: 1,
      marginTop: 10
    },
    supermarketCategoryItem: {
      margin: 15,
      alignItems: 'center',
    },
    supermarketCategoryIcon: {
      width: 70,
      height: 70
    },
    supermarketCategoryName: {
      fontSize: 17,
      textAlign: 'center',
      fontFamily: "OpenSans_500Medium"
    }
  });


export default styles;